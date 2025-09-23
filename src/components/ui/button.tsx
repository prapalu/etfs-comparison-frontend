import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer";

    const variants = {
      primary:
        "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md",
      secondary:
        "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
      outline:
        "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
      ghost:
        "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
