"use client";

import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

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
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
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
  searchable = false,
  searchPlaceholder = "Search options...",
  noOptionsText = "No options found",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Reset search when select closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, searchable]);

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

  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm("");
    searchInputRef.current?.focus();
  };

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => {
        // Update isOpen state
        if (open !== isOpen) {
          setIsOpen(open);
        }

        return (
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
                  "flex items-center",
                  selectedOption
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {searchable && (
                  <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
                )}
                <span className="block truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className={cn(
                    iconSizes[size],
                    "text-gray-400 dark:text-gray-500 transition-transform duration-200",
                    open && "transform rotate-180",
                    !disabled &&
                      "group-hover:text-gray-600 dark:group-hover:text-gray-400"
                  )}
                  aria-hidden="true"
                />
              </span>
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
                  "absolute mt-2 max-h-60 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-base shadow-xl",
                  "ring-1 ring-black/10 dark:ring-white/10 focus:outline-none border border-gray-200 dark:border-gray-700",
                  "z-50", // Fixed high z-index
                  size === "sm" && "text-sm",
                  size === "lg" && "text-lg"
                )}
              >
                {/* Search Input */}
                {searchable && (
                  <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        className={cn(
                          "w-full pl-10 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md",
                          "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                          "focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
                          "placeholder-gray-500 dark:placeholder-gray-400"
                        )}
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <X className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Options List */}
                <div className="py-1 max-h-48 overflow-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="relative cursor-default select-none py-3 px-4 text-gray-500 dark:text-gray-400 text-center">
                      {searchable && searchTerm ? (
                        <div className="space-y-1">
                          <div>{noOptionsText}</div>
                          <div className="text-xs">
                            Try adjusting your search term
                          </div>
                        </div>
                      ) : (
                        "No options available"
                      )}
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
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
                                  "block",
                                  selected ? "font-semibold" : "font-normal"
                                )}
                              >
                                {/* Highlight search term */}
                                {searchable && searchTerm ? (
                                  <HighlightText
                                    text={option.label}
                                    searchTerm={searchTerm}
                                  />
                                ) : (
                                  option.label
                                )}
                              </span>
                              {option.description && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {searchable && searchTerm ? (
                                    <HighlightText
                                      text={option.description}
                                      searchTerm={searchTerm}
                                    />
                                  ) : (
                                    option.description
                                  )}
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
                </div>

                {/* Results counter */}
                {searchable && searchTerm && (
                  <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 px-3 py-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {filteredOptions.length} of {options.length} options
                    </div>
                  </div>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        );
      }}
    </Listbox>
  );
};

// Helper component to highlight search terms
const HighlightText: React.FC<{ text: string; searchTerm: string }> = ({
  text,
  searchTerm,
}) => {
  if (!searchTerm.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-gray-100 px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
