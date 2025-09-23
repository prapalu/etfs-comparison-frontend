// API Endpoints
export const API_ENDPOINTS = {
  ETFS: "/etfs",
  ETF_DETAIL: "/etfs",
  ETF_HISTORIES: "/etf-histories",
  COMPARE: "/compare",
  HEALTH: "/health",
} as const;

// Chart Colors - Professional palette
export const CHART_COLORS = {
  PRIMARY: [
    "#3b82f6", // blue-500
    "#ef4444", // red-500
    "#10b981", // green-500
    "#f59e0b", // yellow-500
    "#8b5cf6", // purple-500
    "#06b6d4", // cyan-500
    "#84cc16", // lime-500
    "#f97316", // orange-500
    "#ec4899", // pink-500
    "#6366f1", // indigo-500
    "#14b8a6", // teal-500
    "#f43f5e", // rose-500
    "#a855f7", // violet-500
    "#22c55e", // green-600
    "#eab308", // yellow-600
  ],
  SECONDARY: [
    "#1e40af", // blue-800
    "#b91c1c", // red-800
    "#047857", // green-800
    "#92400e", // yellow-800
    "#6b21a8", // purple-800
    "#0e7490", // cyan-800
    "#365314", // lime-800
    "#c2410c", // orange-800
    "#be185d", // pink-800
    "#3730a3", // indigo-800
    "#0f766e", // teal-800
    "#be123c", // rose-800
    "#7c2d12", // violet-800
    "#166534", // green-900
    "#a16207", // yellow-800
  ],
  MUTED: [
    "#93c5fd", // blue-300
    "#fca5a5", // red-300
    "#6ee7b7", // green-300
    "#fcd34d", // yellow-300
    "#c4b5fd", // purple-300
    "#67e8f9", // cyan-300
    "#bef264", // lime-300
    "#fdba74", // orange-300
    "#f9a8d4", // pink-300
    "#a5b4fc", // indigo-300
    "#5eead4", // teal-300
    "#fda4af", // rose-300
    "#c084fc", // violet-300
    "#86efac", // green-400
    "#facc15", // yellow-400
  ],
} as const;

// Allocation KPIs
export const ALLOCATION_KPIS = [
  {
    value: "region" as const,
    label: "Geographic Allocation",
    description: "Distribution by geographical regions",
    icon: "🌍",
  },
  {
    value: "sector" as const,
    label: "Sector Allocation",
    description: "Distribution by industry sectors",
    icon: "🏭",
  },
  {
    value: "asset_class" as const,
    label: "Asset Class",
    description: "Distribution by asset classes",
    icon: "📊",
  },
  {
    value: "currency" as const,
    label: "Currency",
    description: "Distribution by currencies",
    icon: "💱",
  },
] as const;

// Chart Types
export const CHART_TYPES = [
  {
    value: "pie" as const,
    label: "Pie Chart",
    description: "Classic circular chart",
    icon: "○",
  },
  {
    value: "doughnut" as const,
    label: "Doughnut Chart",
    description: "Pie chart with hollow center",
    icon: "◯",
  },
  {
    value: "bar" as const,
    label: "Bar Chart",
    description: "Horizontal or vertical bars",
    icon: "▬",
  },
] as const;

// Pagination
export const ITEMS_PER_PAGE = {
  ETFS: 12,
  HOLDINGS: 20,
  COMPARISON: 15,
  SEARCH_RESULTS: 10,
  HISTORIES: 50,
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  CHART: 750,
} as const;

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 15 * 60 * 1000, // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: "etf-analyzer-theme",
  RECENT_ETFS: "etf-analyzer-recent-etfs",
  USER_PREFERENCES: "etf-analyzer-preferences",
  SEARCH_HISTORY: "etf-analyzer-search-history",
} as const;

// Date formats
export const DATE_FORMATS = {
  SHORT: "MMM dd, yyyy",
  LONG: "MMMM dd, yyyy",
  ISO: "yyyy-MM-dd",
  CHART: "MMM yyyy",
  FULL: "EEEE, MMMM dd, yyyy",
} as const;

// Number formats
export const NUMBER_FORMATS = {
  CURRENCY: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  PERCENTAGE: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  COMPACT: {
    notation: "compact" as const,
    compactDisplay: "short" as const,
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network connection failed. Please try again.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  FORBIDDEN: "Access to this resource is forbidden.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  TIMEOUT: "Request timed out. Please try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  GENERIC: "Something went wrong. Please try again.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: "Data loaded successfully",
  COMPARISON_COMPLETE: "ETF comparison completed",
  SEARCH_COMPLETE: "Search completed",
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_CACHING: true,
  ENABLE_ERROR_REPORTING: process.env.NODE_ENV === "production",
  ENABLE_ANALYTICS: process.env.NODE_ENV === "production",
  ENABLE_PWA: false,
  ENABLE_DARK_MODE: true,
} as const;

// ETF Categories for filtering
export const ETF_CATEGORIES = [
  "Equity",
  "Fixed Income",
  "Commodity",
  "Currency",
  "Alternative",
  "Multi-Asset",
  "Money Market",
] as const;

// Geographic regions for filtering
export const REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Emerging Markets",
  "Global",
  "Other",
] as const;

// Sectors for filtering
export const SECTORS = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Industrials",
  "Materials",
  "Real Estate",
  "Telecommunications",
  "Utilities",
  "Other",
] as const;

// Currencies
export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "SEK",
  "NOK",
  "DKK",
] as const;

// Theme configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: "system" as const,
  STORAGE_KEY: STORAGE_KEYS.THEME,
  ENABLE_SYSTEM: true,
} as const;

// Chart configuration
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 320,
  COLORS: CHART_COLORS.PRIMARY,
  ANIMATION_DURATION: ANIMATION_DURATION.CHART,
  RESPONSIVE: true,
  MAINTAIN_ASPECT_RATIO: false,
} as const;

// Table configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: ITEMS_PER_PAGE.HOLDINGS,
  MAX_PAGE_SIZE: 100,
  SORTABLE: true,
  SEARCHABLE: true,
  SHOW_PAGINATION: true,
} as const;
