"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ETF } from "@/types/etf";
import { formatPercentage, formatCompactNumber, formatDate } from "@/lib/utils";
import {
  Search,
  ExternalLink,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Globe,
  BarChart3,
  Star,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ETFCardSkeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { api } from "@/lib/api";

interface FilterState {
  currency: string;
  fundType: string;
  sortBy: "name" | "ticker" | "aum" | "ter" | "lastUpdate";
  sortOrder: "asc" | "desc";
}

const ETFCard = ({ etf }: { etf: ETF }) => {
  const isLargeAUM = etf.aum > 1000000000; // >1B
  const isLowTER = etf.ter < 0.5;

  return (
    <Link
      href={`/etf/${etf.ticker}`}
      className="group block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 dark:from-primary-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Premium badges */}
        <div className="absolute top-3 right-3 flex gap-1">
          {isLargeAUM && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              <Star className="w-3 h-3 inline mr-1" />
              Large Cap
            </div>
          )}
          {isLowTER && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Low Cost
            </div>
          )}
        </div>

        <CardContent className="p-6 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {etf.ticker}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Globe className="w-3 h-3 mr-1" />
                    {etf.locatedIn} • {etf.currency}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                {etf.name}
              </p>
            </div>
            {/* <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-300 flex-shrink-0 ml-2" /> */}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    TER
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {formatPercentage(etf.ter)}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    isLowTER
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-orange-100 dark:bg-orange-900/30"
                  }`}
                >
                  <DollarSign
                    className={`w-4 h-4 ${
                      isLowTER
                        ? "text-green-600 dark:text-green-400"
                        : "text-orange-600 dark:text-orange-400"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    AUM
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {formatCompactNumber(etf.aum, "en-US", etf.currency)}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    isLargeAUM
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {isLargeAUM ? (
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fund Type Badge and Last Update */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-700/50">
              {etf.fundType}
            </span>
            {/* More Info Button */}
            <button className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <span className="relative">
                More Info
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-200 to-purple-200 dark:from-primary-800 dark:to-purple-800 opacity-30" />
              </span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(etf.lastUpdate, { month: "short", day: "numeric" })}
            </div>
          </div>
        </CardContent>

        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary-500 group-hover:to-purple-500 rounded-xl transition-all duration-300" />
      </Card>
    </Link>
  );
};

export default function ETFsPage() {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    currency: "",
    fundType: "",
    sortBy: "aum",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchETFs = async () => {
      try {
        setLoading(true);
        const response = await api.etfs.getAll();
        setETFs(response.etfs || []);
      } catch (err) {
        setError("Failed to fetch ETFs");
        console.error("Error fetching ETFs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchETFs();
  }, []);

  // Get unique values for filters
  const { currencies, fundTypes } = useMemo(() => {
    const currencies = [...new Set(etfs.map((etf) => etf.currency))].sort();
    const fundTypes = [...new Set(etfs.map((etf) => etf.fundType))].sort();
    return { currencies, fundTypes };
  }, [etfs]);

  // Filter and sort ETFs
  const filteredAndSortedETFs = useMemo(() => {
    let filtered = etfs.filter((etf) => {
      const matchesSearch =
        etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        etf.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCurrency =
        !filters.currency || etf.currency === filters.currency;
      const matchesFundType =
        !filters.fundType || etf.fundType === filters.fundType;

      return matchesSearch && matchesCurrency && matchesFundType;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "ticker":
          aValue = a.ticker.toLowerCase();
          bValue = b.ticker.toLowerCase();
          break;
        case "aum":
          aValue = a.aum;
          bValue = b.aum;
          break;
        case "ter":
          aValue = a.ter;
          bValue = b.ter;
          break;
        case "lastUpdate":
          aValue = new Date(a.lastUpdate);
          bValue = new Date(b.lastUpdate);
          break;
        default:
          return 0;
      }

      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [etfs, searchTerm, filters]);

  // Stats for dashboard
  const stats = useMemo(() => {
    if (!etfs.length) return null;

    const totalAUM = etfs.reduce((sum, etf) => sum + etf.aum, 0);
    const avgTER = etfs.reduce((sum, etf) => sum + etf.ter, 0) / etfs.length;
    const uniqueCurrencies = new Set(etfs.map((etf) => etf.currency)).size;
    const uniqueFundTypes = new Set(etfs.map((etf) => etf.fundType)).size;

    return { totalAUM, avgTER, uniqueCurrencies, uniqueFundTypes };
  }, [etfs]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading ETFs
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  ETF Universe
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Explore our comprehensive collection of Exchange Traded Funds.
                Discover, compare, and analyze the perfect ETFs for your
                investment strategy.
              </p>

              {/* Quick Stats */}
              {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Funds
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {etfs.length}
                    </p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total AUM
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatCompactNumber(stats.totalAUM)}
                    </p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg TER
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatPercentage(stats.avgTER)}
                    </p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Currencies
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stats.uniqueCurrencies}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ETFs by name or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filters.currency || filters.fundType) && (
              <span className="bg-primary-500 text-white rounded-full w-2 h-2" />
            )}
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <Select
                value={filters.currency}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, currency: value }))
                }
                options={[
                  { value: "", label: "All Currencies" },
                  ...currencies.map((currency) => ({
                    value: currency,
                    label: currency,
                  })),
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fund Type
              </label>
              <Select
                value={filters.fundType}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, fundType: value }))
                }
                options={[
                  { value: "", label: "All Types" },
                  ...fundTypes.map((type) => ({ value: type, label: type })),
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <Select
                value={filters.sortBy}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, sortBy: value as any }))
                }
                options={[
                  { value: "aum", label: "Assets Under Management" },
                  { value: "ter", label: "Total Expense Ratio" },
                  { value: "name", label: "Name" },
                  { value: "ticker", label: "Ticker" },
                  { value: "lastUpdate", label: "Last Updated" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order
              </label>
              <Select
                value={filters.sortOrder}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, sortOrder: value as any }))
                }
                options={[
                  { value: "desc", label: "Descending" },
                  { value: "asc", label: "Ascending" },
                ]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {loading
              ? "Loading..."
              : `${filteredAndSortedETFs.length} ETFs Found`}
          </h2>
          {searchTerm && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Results for "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* ETF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <ETFCardSkeleton key={i} />)
          : filteredAndSortedETFs.map((etf) => (
              <ETFCard key={etf._id} etf={etf} />
            ))}
      </div>

      {/* Empty State */}
      {!loading && filteredAndSortedETFs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No ETFs Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm
              ? `No ETFs match "${searchTerm}". Try adjusting your search or filters.`
              : "No ETFs match your current filters. Try adjusting your criteria."}
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setFilters({
                currency: "",
                fundType: "",
                sortBy: "aum",
                sortOrder: "desc",
              });
            }}
            variant="outline"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
