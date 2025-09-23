import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback for invalid currency codes
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Format number as percentage
 */
export function formatPercentage(
  value: number,
  decimals: number = 2,
  locale: string = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (error) {
    return `${value.toFixed(decimals)}%`;
  }
}

/**
 * Format date with various options
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  locale: string = "en-US"
): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (error) {
    return "Invalid Date";
  }
}

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: string | Date,
  locale: string = "en-US"
): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - dateObj.getTime()) / 1000
    );

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
    if (diffInSeconds < 3600)
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
    if (diffInSeconds < 86400)
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
    if (diffInSeconds < 2592000)
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
    if (diffInSeconds < 31536000)
      return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");
    return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
  } catch (error) {
    return "Unknown";
  }
}

/**
 * Format large numbers in compact form
 */
export function formatCompactNumber(
  num: number,
  locale: string = "en-US",
  currency?: string
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
      ...(currency && {
        style: "currency",
        currency: currency.toUpperCase(),
      }),
    });
    return formatter.format(num);
  } catch (error) {
    // Fallback implementation
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  }
}

/**
 * Format number with locale-specific separators
 */
export function formatNumber(
  num: number,
  decimals: number = 0,
  locale: string = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch (error) {
    return num.toFixed(decimals);
  }
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random color from predefined palette
 */
export function getRandomColor(palette?: string[]): string {
  const defaultColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
    "#14b8a6",
    "#f43f5e",
    "#a855f7",
    "#22c55e",
    "#eab308",
  ];

  const colors = palette || defaultColors;
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate array of colors for charts
 */
export function generateColorPalette(
  count: number,
  baseColors?: string[]
): string[] {
  const defaultColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
    "#14b8a6",
    "#f43f5e",
    "#a855f7",
    "#22c55e",
    "#eab308",
  ];

  const colors = baseColors || defaultColors;
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }

  return result;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array)
    return obj.map((item) => deepClone(item)) as unknown as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
}

/**
 * Sleep function for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Convert string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
}

/**
 * Truncate string with ellipsis
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = "..."
): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Round number to specific decimal places
 */
export function roundTo(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Clamp number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Get file size in human readable format
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2);
  return prefix + timestamp + random;
}

/**
 * Check if code is running on client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Check if code is running on server side
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Get browser information
 */
export function getBrowserInfo() {
  if (!isClient()) return null;

  const userAgent = navigator.userAgent;
  const isChrome = userAgent.includes("Chrome");
  const isFirefox = userAgent.includes("Firefox");
  const isSafari = userAgent.includes("Safari") && !isChrome;
  const isEdge = userAgent.includes("Edge");

  return {
    userAgent,
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    ),
  };
}
