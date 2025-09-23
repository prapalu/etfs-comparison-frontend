import { useState, useEffect, useCallback, useRef } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

interface UseLocalStorageOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

/**
 * Custom hook for localStorage with SSR support and error handling
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): [T, SetValue<T>, () => void] {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options;

  // Use a ref to track if we're on the client
  const isClient = useRef(false);

  // Initialize state with a function to avoid SSR issues
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Return initialValue during SSR
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      isClient.current = true;
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue: SetValue<T> = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to localStorage only on client
        if (typeof window !== "undefined") {
          if (valueToStore === undefined) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, serialize(valueToStore));
          }
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize, storedValue]
  );

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync with localStorage changes from other tabs/windows
  useEffect(() => {
    if (!isClient.current) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = deserialize(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, deserialize]);

  // Hydration effect for Next.js SSR
  useEffect(() => {
    if (typeof window !== "undefined" && !isClient.current) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const value = deserialize(item);
          setStoredValue(value);
        }
        isClient.current = true;
      } catch (error) {
        console.warn(
          `Error reading localStorage key "${key}" during hydration:`,
          error
        );
      }
    }
  }, [key, deserialize]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for storing arrays in localStorage with array-specific methods
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
): [
  T[],
  {
    add: (item: T) => void;
    remove: (index: number) => void;
    update: (index: number, item: T) => void;
    clear: () => void;
    set: (items: T[]) => void;
  }
] {
  const [items, setItems] = useLocalStorage<T[]>(key, initialValue);

  const add = useCallback(
    (item: T) => {
      setItems((prev) => [...prev, item]);
    },
    [setItems]
  );

  const remove = useCallback(
    (index: number) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
    },
    [setItems]
  );

  const update = useCallback(
    (index: number, item: T) => {
      setItems((prev) =>
        prev.map((existing, i) => (i === index ? item : existing))
      );
    },
    [setItems]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const set = useCallback(
    (newItems: T[]) => {
      setItems(newItems);
    },
    [setItems]
  );

  return [
    items,
    {
      add,
      remove,
      update,
      clear,
      set,
    },
  ];
}
