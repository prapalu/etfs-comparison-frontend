"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BarChart3, TrendingUp, GitCompare, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "ETFs", href: "/etfs", icon: BarChart3 },
  { name: "Compare", href: "/compare", icon: GitCompare },
] as const;

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              <TrendingUp className="w-6 h-6" />
              <span>ETF Analyzer</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center",
                    isActive
                      ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
