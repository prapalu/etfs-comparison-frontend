"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ComparisonChart } from "@/components/charts/comparison-chart";
import { formatPercentage, formatCompactNumber, formatDate } from "@/lib/utils";
import {
  GitCompare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Building2,
  Zap,
  Star,
  Shield,
  ArrowRight,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Sparkles,
  Award,
  RefreshCw,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Equal,
  X,
  Calendar,
} from "lucide-react";
import { ComparisonResult, ETF } from "@/types/etf";

interface ETFComparisonProps {
  etfs: ETF[];
  onCompare: (
    etfId1: string,
    etfId2: string
  ) => Promise<ComparisonResult | null>;
}

// Enhanced ETF Card Component
const EnhancedETFCard: React.FC<{
  etf: ETF;
  position: "left" | "right";
  isSelected?: boolean;
  onRemove?: () => void;
}> = ({ etf, position, isSelected, onRemove }) => {
  const isLargeAUM = etf.aum > 1000000000;
  const isLowTER = etf.ter < 0.5;

  const cardColorClass =
    position === "left"
      ? "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800"
      : "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800";

  const accentColor = position === "left" ? "blue" : "red";

  return (
    <Card
      className={`relative bg-gradient-to-br ${cardColorClass} border transition-all duration-300 hover:shadow-lg ${
        isSelected ? "ring-2 ring-primary-500" : ""
      }`}
    >
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
        >
          <X className="w-3 h-3 text-gray-500" />
        </button>
      )}

      <CardContent className="p-6">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${
                  position === "left"
                    ? "from-blue-500 to-cyan-600"
                    : "from-red-500 to-pink-600"
                } rounded-lg flex items-center justify-center shadow-lg`}
              >
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {etf.ticker}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {etf.locatedIn} • {etf.currency}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
              {etf.name}
            </p>

            {/* Premium badges */}
            <div className="flex flex-wrap gap-1 mb-4">
              {isLargeAUM && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                  <Star className="w-3 h-3" />
                  Large
                </span>
              )}
              {isLowTER && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold rounded-full">
                  <Zap className="w-3 h-3" />
                  Low Cost
                </span>
              )}
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  position === "left"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                }`}
              >
                {etf.fundType}
              </span>
            </div>
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  TER
                </p>
                <p
                  className={`text-lg font-bold ${
                    isLowTER
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
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

          <div className="bg-white/70 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  AUM
                </p>
                <p
                  className={`text-lg font-bold ${
                    isLargeAUM
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
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

        {/* Additional info */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(etf.lastUpdate, { month: "short", day: "numeric" })}
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {etf.returnMethod}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Comparison Summary Component
const ComparisonSummary: React.FC<{
  etf1: ETF;
  etf2: ETF;
  comparison: ComparisonResult | null;
}> = ({ etf1, etf2, comparison }) => {
  const similarities = useMemo(() => {
    const items = [];
    if (etf1.currency === etf2.currency) items.push("Same Currency");
    if (etf1.locatedIn === etf2.locatedIn) items.push("Same Domicile");
    if (etf1.fundType === etf2.fundType) items.push("Same Type");
    if (Math.abs(etf1.ter - etf2.ter) < 0.1) items.push("Similar TER");
    return items;
  }, [etf1, etf2]);

  const differences = useMemo(() => {
    const items = [];
    if (etf1.currency !== etf2.currency) items.push("Different Currency");
    if (etf1.locatedIn !== etf2.locatedIn) items.push("Different Domicile");
    if (etf1.fundType !== etf2.fundType) items.push("Different Type");
    if (Math.abs(etf1.ter - etf2.ter) >= 0.1) items.push("Different TER");
    return items;
  }, [etf1, etf2]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Similarities */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Similarities
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {similarities.length} common features
              </p>
            </div>
          </div>
          {similarities.length > 0 ? (
            <ul className="space-y-2">
              {similarities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              No common features found
            </p>
          )}
        </CardContent>
      </Card>

      {/* Differences */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Key Differences
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {differences.length} distinctive features
              </p>
            </div>
          </div>
          {differences.length > 0 ? (
            <ul className="space-y-2">
              {differences.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Funds are very similar
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const ETFComparison: React.FC<ETFComparisonProps> = ({
  etfs,
  onCompare,
}) => {
  const [selectedETF1, setSelectedETF1] = useState<string>("");
  const [selectedETF2, setSelectedETF2] = useState<string>("");
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasCompared, setHasCompared] = useState(false);

  const etfOptions = useMemo(
    () =>
      etfs.map((etf) => ({
        value: etf._id,
        label: `${etf.ticker} - ${etf.name}`,
      })),
    [etfs]
  );

  const handleCompare = async () => {
    if (!selectedETF1 || !selectedETF2) return;

    setLoading(true);
    try {
      const result = await onCompare(selectedETF1, selectedETF2);
      setComparison(result);
      setHasCompared(true);
    } catch (error) {
      console.error("Comparison failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedETF1("");
    setSelectedETF2("");
    setComparison(null);
    setHasCompared(false);
  };

  const etf1 = etfs.find((etf) => etf._id === selectedETF1);
  const etf2 = etfs.find((etf) => etf._id === selectedETF2);

  const canCompare =
    selectedETF1 && selectedETF2 && selectedETF1 !== selectedETF2;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="relative p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <GitCompare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  ETF Comparison Tool
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                  Compare two ETFs side by side to analyze their differences,
                  overlaps, and key characteristics
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Selection Interface */}
      <Card className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Select ETFs to Compare
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose two ETFs from our database to perform detailed comparison
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-end">
            {/* ETF 1 Selection */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                First ETF
              </label>
              <Select
                value={selectedETF1}
                onChange={setSelectedETF1}
                options={etfOptions.filter((opt) => opt.value !== selectedETF2)}
                placeholder="Search and select first ETF..."
                className="w-full"
              />
            </div>

            {/* VS Divider */}
            <div className="flex justify-center lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  VS
                </span>
              </div>
            </div>

            {/* ETF 2 Selection */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                Second ETF
              </label>
              <Select
                value={selectedETF2}
                onChange={setSelectedETF2}
                options={etfOptions.filter((opt) => opt.value !== selectedETF1)}
                placeholder="Search and select second ETF..."
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button
              onClick={handleCompare}
              disabled={!canCompare || loading}
              className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4" />
                  <span>Compare ETFs</span>
                </div>
              )}
            </Button>

            {(selectedETF1 || selectedETF2) && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4 mr-2" />
                Reset Selection
              </Button>
            )}

            {hasCompared && (
              <>
                <Button
                  variant="outline"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ETF Overview Cards */}
      {etf1 && etf2 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Fund Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <EnhancedETFCard
              etf={etf1}
              position="left"
              isSelected={true}
              onRemove={() => setSelectedETF1("")}
            />
            <EnhancedETFCard
              etf={etf2}
              position="right"
              isSelected={true}
              onRemove={() => setSelectedETF2("")}
            />
          </div>

          {/* Comparison Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Equal className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Quick Analysis
              </h2>
            </div>
            <ComparisonSummary
              etf1={etf1}
              etf2={etf2}
              comparison={comparison}
            />
          </div>
        </div>
      )}

      {/* Detailed Comparison Results */}
      {hasCompared && etf1 && etf2 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Detailed Holdings Analysis
            </h2>
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.002]">
            <ComparisonChart
              comparison={comparison}
              etf1={etf1}
              etf2={etf2}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!etf1 && !etf2 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <GitCompare className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready to Compare ETFs
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Select two ETFs from the dropdowns above to start your comparison
            analysis
          </p>
        </div>
      )}
    </div>
  );
};
