"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useParams } from "next/navigation";
import { ETF, ETFHistory, AllocationKPI } from "@/types/etf";
import { api } from "@/lib/api";
import { ETFInfo } from "@/components/etf-info";
import { AllocationChart } from "@/components/charts/allocation-chart";
import { EvolutionChart } from "@/components/charts/evolution-chart";
import { HoldingsTable } from "@/components/holdings-table";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";
import {
  BarChart3,
  TrendingUp,
  Globe,
  PieChart,
  Calendar,
  Settings,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowLeft,
  Eye,
  Users,
  DollarSign,
  Activity,
  Target,
  Layers,
  MapPin,
  Clock,
  Zap,
  Star,
  RefreshCw,
} from "lucide-react";
import { formatPercentage, formatCompactNumber, formatDate } from "@/lib/utils";
import Link from "next/link";

// Quick Stats Component
const QuickStatsCard = ({ etf }: { etf: ETF }) => {
  const stats = [
    {
      label: "Total Expense Ratio",
      value: formatPercentage(etf.ter),
      icon: DollarSign,
      color: "blue",
      change: etf.ter < 0.5 ? "low" : etf.ter < 1.0 ? "medium" : "high",
    },
    {
      label: "Assets Under Management",
      value: formatCompactNumber(etf.aum, "en-US", etf.currency),
      icon: TrendingUp,
      color: "green",
      change:
        etf.aum > 1000000000 ? "high" : etf.aum > 100000000 ? "medium" : "low",
    },
    {
      label: "Fund Type",
      value: etf.fundType,
      icon: Layers,
      color: "purple",
    },
    {
      label: "Domicile",
      value: etf.locatedIn,
      icon: MapPin,
      color: "orange",
    },
  ];

  const getChangeColor = (change?: string) => {
    switch (change) {
      case "high":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getBgColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      green:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      purple:
        "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      orange:
        "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`border ${getBgColor(
              stat.color
            )} transition-all duration-300 hover:shadow-lg`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {stat.label}
                  </p>
                  <p
                    className={`text-lg font-bold mt-1 ${
                      stat.change
                        ? getChangeColor(stat.change)
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-lg ${getBgColor(stat.color)
                    .replace("50", "100")
                    .replace("900/20", "900/40")}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// Analysis Controls Component
const AnalysisControls = ({
  dateOptions,
  selectedDate,
  setSelectedDate,
  kpiOptions,
  selectedKPI,
  setSelectedKPI,
  onRefresh,
  isRefreshing,
}: {
  dateOptions: { value: string; label: string }[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  kpiOptions: { value: string; label: string }[];
  selectedKPI: AllocationKPI;
  setSelectedKPI: (kpi: AllocationKPI) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}) => {
  return (
    <Card className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Analysis Controls
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize your data view and analysis parameters
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              Analysis Date
            </label>
            <Select
              value={selectedDate}
              onChange={setSelectedDate}
              options={dateOptions}
              placeholder="Select a date..."
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose the snapshot date for portfolio analysis
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Target className="w-4 h-4" />
              Analysis Type
            </label>
            <Select
              value={selectedKPI}
              onChange={(value) => setSelectedKPI(value as AllocationKPI)}
              options={kpiOptions}
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select the dimension for portfolio breakdown
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Portfolio Summary Component
const PortfolioSummary = ({
  selectedHistory,
}: {
  selectedHistory: ETFHistory;
}) => {
  const summary = useMemo(() => {
    if (!selectedHistory?.holdings?.length) return null;

    const totalHoldings = selectedHistory.holdings.length;
    const totalWeight = selectedHistory.holdings.reduce(
      (sum, h) => sum + h.weight_pct,
      0
    );
    const topHolding = selectedHistory.holdings.reduce((max, h) =>
      h.weight_pct > max.weight_pct ? h : max
    );

    const top10Holdings = selectedHistory.holdings
      .sort((a, b) => b.weight_pct - a.weight_pct)
      .slice(0, 10)
      .reduce((sum, h) => sum + h.weight_pct, 0);

    const sectors = [...new Set(selectedHistory.holdings.map((h) => h.sector))]
      .length;
    const regions = [...new Set(selectedHistory.holdings.map((h) => h.region))]
      .length;

    return {
      totalHoldings,
      totalWeight,
      topHolding,
      top10Holdings,
      sectors,
      regions,
    };
  }, [selectedHistory]);

  if (!summary) return null;

  return (
    <Card className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-primary-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Portfolio Snapshot
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(selectedHistory.date, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Users className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Holdings</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {summary.totalHoldings}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Activity className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Coverage</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatPercentage(summary.totalWeight)}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Top Weight
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatPercentage(summary.topHolding.weight_pct)}
            </p>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Top 10 Holdings
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatPercentage(summary.top10Holdings)}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Layers className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Sectors</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {summary.sectors}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <Globe className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Regions</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {summary.regions}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ETFDetailPage() {
  const params = useParams();
  const etfId = params.id as string;

  const [etf, setETF] = useState<ETF | null>(null);
  const [histories, setHistories] = useState<ETFHistory[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedKPI, setSelectedKPI] = useState<AllocationKPI>("region");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.etfs.getById(etfId);
      setETF(response.etf);
      setHistories(response.histories || []);

      if (response.histories && response.histories.length > 0) {
        setSelectedDate(response.histories[0].date);
      }
    } catch (err) {
      setError("Failed to fetch ETF data");
      console.error("Error fetching ETF:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (etfId) {
      fetchData();
    }
  }, [etfId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const selectedHistory = histories.find((h) => h.date === selectedDate);

  const dateOptions = useMemo(
    () =>
      histories
        .map((h) => ({
          value: h.date,
          label: format(parseISO(h.date), "MMM dd, yyyy"),
        }))
        .reverse(), // Most recent first
    [histories]
  );

  const kpiOptions = [
    { value: "region", label: "Geographic Allocation" },
    { value: "sector", label: "Sector Allocation" },
    { value: "asset_class", label: "Asset Class" },
    { value: "currency", label: "Currency" },
  ];

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading ETF Details
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/etfs">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to ETFs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/etfs"
          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          ETFs
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {etf?.ticker || "Loading..."}
        </span>
      </div>

      {/* ETF Header Info */}
      <Suspense fallback={<ChartSkeleton />}>
        <ETFInfo etf={etf} loading={loading} />
      </Suspense>

      {/* Quick Stats */}
      {etf && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Key Metrics
            </h2>
          </div>
          <QuickStatsCard etf={etf} />
        </div>
      )}

      {/* Analysis Controls */}
      {histories.length > 0 && (
        <AnalysisControls
          dateOptions={dateOptions}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          kpiOptions={kpiOptions}
          selectedKPI={selectedKPI}
          setSelectedKPI={setSelectedKPI}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      )}

      {/* Portfolio Summary */}
      {selectedHistory && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Portfolio Overview
            </h2>
          </div>
          <PortfolioSummary selectedHistory={selectedHistory} />
        </div>
      )}

      {/* Allocation Charts */}
      {selectedHistory && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Allocation Analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Suspense fallback={<ChartSkeleton />}>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <AllocationChart
                  data={selectedHistory}
                  kpi="region"
                  title="Geographic Allocation"
                  loading={loading}
                />
              </div>
            </Suspense>

            <Suspense fallback={<ChartSkeleton />}>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <AllocationChart
                  data={selectedHistory}
                  kpi="sector"
                  title="Sector Allocation"
                  loading={loading}
                />
              </div>
            </Suspense>
          </div>
        </div>
      )}

      {/* Evolution Chart */}
      {histories.length > 1 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Historical Evolution
            </h2>
          </div>

          <Suspense fallback={<ChartSkeleton height="h-96" />}>
            <div className="transform transition-all duration-300 hover:scale-[1.005]">
              <EvolutionChart
                histories={histories}
                kpi={selectedKPI}
                title={`${
                  kpiOptions.find((k) => k.value === selectedKPI)?.label
                } Evolution Over Time`}
                loading={loading}
              />
            </div>
          </Suspense>
        </div>
      )}

      {/* Holdings Table */}
      {selectedHistory && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Holdings Detail
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              Updated:{" "}
              {formatDate(selectedHistory.date, {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <Suspense fallback={<ChartSkeleton />}>
            <div className="transform transition-all duration-300 hover:shadow-lg">
              <HoldingsTable
                holdings={selectedHistory.holdings}
                loading={loading}
                title={`Holdings Portfolio (${format(
                  parseISO(selectedHistory.date),
                  "MMM dd, yyyy"
                )})`}
              />
            </div>
          </Suspense>
        </div>
      )}

      {/* Empty State for No Histories */}
      {!loading && histories.length === 0 && etf && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Historical Data Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Historical portfolio data is not available for this ETF yet.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Check Again
          </Button>
        </div>
      )}
    </div>
  );
}
