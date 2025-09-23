import type {
  ApiResponse,
  ETFsResponse,
  ETFDetailResponse,
  ETFHistoriesResponse,
  ETFHistoriesParams,
  ComparisonResponse,
  ComparisonParams,
  RequestConfig,
  RequestMethod,
} from "@/types/api";
import type { ETF, ETFHistory, ComparisonResult } from "@/types/etf";

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: Record<string, any>;

  constructor(
    status: number,
    message: string,
    code?: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function fetchApi<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    timeout = DEFAULT_TIMEOUT,
  } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new ApiError(
        response.status,
        `Expected JSON response, got ${contentType}`,
        "INVALID_CONTENT_TYPE"
      );
    }

    const data = await response.json();

    console.log("api response", data, response);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || data.error || `HTTP error! status: ${response.status}`,
        data.code,
        data.details
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new ApiError(408, "Request timeout", "TIMEOUT");
      }

      throw new ApiError(0, `Network error: ${error.message}`, "NETWORK_ERROR");
    }

    throw new ApiError(500, "Unknown error occurred", "UNKNOWN_ERROR");
  }
}

/**
 * API client with all endpoints
 */
export const api = {
  // ETF endpoints
  etfs: {
    /**
     * Get list of all ETFs
     */
    getAll: async (): Promise<ETFsResponse> => {
      return fetchApi<ETFsResponse>("/etf");
    },

    /**
     * Get specific ETF with histories
     */
    getById: async (id: string): Promise<ETFDetailResponse> => {
      if (!id) {
        throw new ApiError(400, "ETF ID is required", "MISSING_ID");
      }
      return fetchApi<ETFDetailResponse>(`/etf/${id}`);
    },

    /**
     * Search ETFs by query
     */
    search: async (query: string, limit?: number): Promise<ETFsResponse> => {
      return fetchApi<ETFsResponse>("/etf/search", {
        params: { q: query, ...(limit && { limit }) },
      });
    },
  },

  // ETF History endpoints
  histories: {
    /**
     * Get ETF histories with optional filters
     */
    get: async (
      params: ETFHistoriesParams = {}
    ): Promise<ETFHistoriesResponse> => {
      return fetchApi<ETFHistoriesResponse>("/etf-histories", { params });
    },

    /**
     * Get history for specific ETF and date
     */
    getByDate: async (etfId: string, date: string): Promise<ETFHistory> => {
      if (!etfId || !date) {
        throw new ApiError(
          400,
          "ETF ID and date are required",
          "MISSING_PARAMS"
        );
      }
      return fetchApi<ETFHistory>("/etf-histories", {
        params: { etfId, date },
      });
    },
  },

  // Comparison endpoints
  comparison: {
    /**
     * Compare two ETFs
     */
    compare: async (params: ComparisonParams): Promise<ComparisonResponse> => {
      const { etf1, etf2, date1, date2 } = params;

      if (!etf1 || !etf2) {
        throw new ApiError(400, "Both ETF IDs are required", "MISSING_ETFS");
      }

      if (etf1 === etf2) {
        throw new ApiError(400, "Cannot compare ETF with itself", "SAME_ETFS");
      }

      return fetchApi<ComparisonResponse>("/compare", {
        params: {
          etf1,
          etf2,
          ...(date1 && { date1 }),
          ...(date2 && { date2 }),
        },
      });
    },
  },

  // Health check
  health: {
    /**
     * Check API health
     */
    check: async (): Promise<{ status: string; timestamp: string }> => {
      return fetchApi<{ status: string; timestamp: string }>("/health");
    },
  },
};

/**
 * Request interceptor for adding auth tokens, etc.
 */
export function setAuthToken(token: string): void {
  // Implementation would store token and add to all requests
  console.log("Auth token set:", token);
}

/**
 * Clear auth token
 */
export function clearAuthToken(): void {
  // Implementation would clear stored token
  console.log("Auth token cleared");
}

/**
 * Retry failed requests with exponential backoff
 */
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry client errors (4xx) except 429 (too many requests)
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500 &&
        error.status !== 429
      ) {
        throw error;
      }

      if (i < maxRetries) {
        const delay = baseDelay * Math.pow(2, i); // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Create a request with cache support
 */
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function cachedRequest<T>(
  key: string,
  requestFn: () => Promise<T>,
  cacheDuration: number = CACHE_DURATION
): Promise<T> {
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.data;
  }

  const data = await requestFn();
  cache.set(key, { data, timestamp: Date.now() });

  return data;
}

/**
 * Clear cache
 */
export function clearCache(): void {
  cache.clear();
}

// Legacy API methods for backward compatibility
export const getETFs = api.etfs.getAll;
export const getETF = api.etfs.getById;
export const getETFHistories = api.histories.get;
export const compareETFs = (
  etfId1: string,
  etfId2: string,
  date1?: string,
  date2?: string
) => api.comparison.compare({ etf1: etfId1, etf2: etfId2, date1, date2 });
