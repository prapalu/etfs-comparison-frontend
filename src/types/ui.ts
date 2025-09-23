import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

// Theme types
export type Theme = "dark" | "light" | "system";

export interface ThemeConfig {
  defaultTheme: Theme;
  storageKey: string;
  enableSystem: boolean;
}

// Component base types
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface ComponentWithLoading extends BaseComponentProps {
  loading?: boolean;
}

// Button variants and sizes
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

// Card variants
export type CardVariant = "default" | "outlined" | "elevated" | "ghost";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  clickable?: boolean;
  children: ReactNode;
}

// Alert types
export type AlertVariant = "default" | "success" | "warning" | "error" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// Badge types
export type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

// Loading states
export interface LoadingState {
  loading: boolean;
  error: string | null;
  data: any;
}

// Table types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (item: T) => void;
}

// Chart types
export interface ChartColors {
  primary: string[];
  secondary: string[];
  success: string[];
  warning: string[];
  error: string[];
}

export interface ChartTheme {
  colors: ChartColors;
  fonts: {
    base: string;
    mono: string;
  };
  borderRadius: number;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

// Form types
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: ReactNode;
}

export interface SelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}
