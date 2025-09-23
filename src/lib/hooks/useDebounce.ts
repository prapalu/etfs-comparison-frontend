import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook that debounces a value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that debounces a callback function
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );

  return debouncedCallback;
}

/**
 * Hook for debounced state with immediate and debounced values
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, (value: T | ((prev: T) => T)) => void] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(immediateValue, delay);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setImmediateValue((prev) =>
      typeof value === "function" ? (value as (prev: T) => T)(prev) : value
    );
  }, []);

  return [immediateValue, debouncedValue, setValue];
}
