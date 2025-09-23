"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "p-2 rounded-md transition-all duration-200",
            theme === value
              ? "bg-white dark:bg-gray-700 shadow-sm text-primary-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          )}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};
