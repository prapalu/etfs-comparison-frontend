"use client";

import { ChevronDown, Check } from "lucide-react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className,
  error = false,
  size = "md",
}) => {
  const selectedOption = options.find((option) => option.value === value);

  const sizeClasses = {
    sm: "py-1.5 pl-3 pr-8 text-sm",
    md: "py-2.5 pl-3 pr-10 text-sm",
    lg: "py-3 pl-4 pr-12 text-base",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            "relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-800 text-left border shadow-sm transition-all duration-200",
            // Default border and focus states
            !error &&
              !disabled &&
              "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
            !error &&
              !disabled &&
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-primary-400/30 dark:focus:border-primary-400",
            // Error state
            error &&
              "border-red-300 dark:border-red-600 hover:border-red-400 dark:hover:border-red-500 focus:ring-red-500/20 focus:border-red-500",
            // Disabled state
            disabled &&
              "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60",
            // Hover effects for non-disabled
            !disabled &&
              "hover:shadow-md hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
            // Size classes
            sizeClasses[size],
            className
          )}
        >
          <span
            className={cn(
              "block truncate",
              selectedOption
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown
              className={cn(
                iconSizes[size],
                "text-gray-400 dark:text-gray-500 transition-transform duration-200",
                !disabled &&
                  "group-hover:text-gray-600 dark:group-hover:text-gray-400"
              )}
              aria-hidden="true"
            />
          </span>

          {/* Focus ring overlay */}
          <div className="absolute inset-0 rounded-lg ring-0 ring-primary-500/0 transition-all duration-200 pointer-events-none" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Listbox.Options
            className={cn(
              "absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-xl",
              "ring-1 ring-black/10 dark:ring-white/10 focus:outline-none border border-gray-200 dark:border-gray-700",
              "z-50", // Fixed high z-index
              size === "sm" && "text-sm",
              size === "lg" && "text-lg"
            )}
          >
            {options.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-500 dark:text-gray-400 text-center">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) =>
                    cn(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors duration-150",
                      // Active (hover) state
                      active && !option.disabled
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100"
                        : "text-gray-900 dark:text-gray-100",
                      // Selected state
                      selected &&
                        "bg-primary-100/50 dark:bg-primary-900/30 font-medium",
                      // Disabled state
                      option.disabled &&
                        "cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-700/50"
                    )
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "block truncate",
                            selected ? "font-semibold" : "font-normal"
                          )}
                        >
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {option.description}
                          </span>
                        )}
                      </div>

                      {selected && (
                        <span
                          className={cn(
                            "absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-150",
                            active
                              ? "text-primary-600 dark:text-primary-400"
                              : "text-primary-500 dark:text-primary-400"
                          )}
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}

                      {/* Hover highlight bar */}
                      {active && !option.disabled && (
                        <div className="absolute inset-y-0 left-0 w-1 bg-primary-500 dark:bg-primary-400 rounded-r-sm" />
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
