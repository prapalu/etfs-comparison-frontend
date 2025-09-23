import { ComparisonResult, ETF, ETFHistory } from "./etf";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ETF API specific responses
export interface ETFsResponse {
  etfs: ETF[];
  total: number;
  page?: number;
  limit?: number;
}

export interface ETFDetailResponse {
  etf: ETF;
  histories: ETFHistory[];
  latestHistory?: ETFHistory;
}

export interface ETFHistoriesResponse {
  histories: ETFHistory[];
  total: number;
}

export interface ComparisonResponse {
  comparison: ComparisonResult;
  etf1: ETF;
  etf2: ETF;
}

// Request types
export interface ETFHistoriesParams {
  etfId?: string;
  date?: string;
  limit?: number;
  page?: number;
}

export interface ComparisonParams {
  etf1: string;
  etf2: string;
  date1?: string;
  date2?: string;
}

// Generic API utilities
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestConfig {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}
