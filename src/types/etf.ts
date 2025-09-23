export interface ETF {
  _id: string;
  name: string;
  ticker: string;
  link: string;
  fundType: string;
  currency: string;
  class: string;
  returnMethod: string;
  ter: number;
  aum: number;
  lastUpdate: string;
  locatedIn: string;
  distributionReturn: string;
  exportLink: string;
}

export interface Holding {
  issuer_ticker: string;
  name: string;
  sector: string;
  asset_class: string;
  market_value: number;
  weight_pct: number;
  notional_value: number;
  nominal: number;
  price: number;
  region: string;
  fx: string;
  currency: string;
}

export interface ETFHistory {
  _id: string;
  etf: string;
  date: string;
  holdings: Holding[];
}

export interface AllocationData {
  [key: string]: number;
}

export interface ComparisonResult {
  overlap: ComparisonOverlap[];
  total_overlap: number;
  unique_etf1: Holding[];
  unique_etf2: Holding[];
}

export interface ComparisonOverlap {
  ticker: string;
  name: string;
  weight_etf1: number;
  weight_etf2: number;
  overlap_weight: number;
}

export type ChartType = "pie" | "doughnut" | "bar";
export type AllocationKPI = "region" | "sector" | "asset_class" | "currency";

// Extended types for better type safety
export interface ETFWithHistories extends ETF {
  histories: ETFHistory[];
}

export interface ProcessedAllocation {
  labels: string[];
  values: number[];
  colors: string[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface PaginatedHoldings {
  holdings: Holding[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Utility types for forms and UI
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SortConfig<T> {
  field: keyof T;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  searchTerm: string;
  sector?: string;
  region?: string;
  minWeight?: number;
  maxWeight?: number;
}
