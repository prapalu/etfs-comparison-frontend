"use client";

import { ETF } from "@/types/etf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPercentage, formatDate, formatCompactNumber } from "@/lib/utils";
import {
  ExternalLink,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  Percent,
  Coins,
  ArrowUpRight,
  Star,
  Shield,
  Zap,
  Globe,
  Award,
  Info,
  BookOpen,
  Download,
  Share2,
  Bookmark,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface ETFInfoProps {
  etf: ETF | null;
  loading?: boolean;
}

// Enhanced Skeleton with better animations
const ETFInfoSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-5 w-48 mx-auto" />
            <div className="flex justify-center gap-3 mt-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Premium badges component
const PremiumBadges: React.FC<{ etf: ETF }> = ({ etf }) => {
  const badges = [];

  if (etf.aum > 1000000000) {
    badges.push({
      icon: Star,
      label: "Large Fund",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      textColor: "text-white",
    });
  }

  if (etf.ter < 0.3) {
    badges.push({
      icon: Zap,
      label: "Ultra Low Cost",
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
      textColor: "text-white",
    });
  } else if (etf.ter < 0.6) {
    badges.push({
      icon: Shield,
      label: "Low Cost",
      color: "bg-gradient-to-r from-blue-400 to-cyan-500",
      textColor: "text-white",
    });
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg ${badge.color} ${badge.textColor}`}
          >
            <Icon className="w-4 h-4" />
            {badge.label}
          </div>
        );
      })}
    </div>
  );
};

// Action buttons component
const ActionButtons: React.FC<{ etf: ETF }> = ({ etf }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {etf.link && (
        <Button
          asChild
          className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <a
            href={etf.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Provider Site
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </Button>
      )}

      <Button
        variant="outline"
        onClick={handleCopyLink}
        className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
      >
        {copied ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Share Link
          </>
        )}
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
      >
        <Download className="w-4 h-4" />
        Export Data
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
      >
        <Bookmark className="w-4 h-4" />
        Save
      </Button>
    </div>
  );
};

// Key metrics component
const KeyMetrics: React.FC<{ etf: ETF }> = ({ etf }) => {
  const metrics = [
    {
      label: "Total Expense Ratio",
      value: formatPercentage(etf.ter),
      icon: Percent,
      color: "blue",
      trend:
        etf.ter < 0.5 ? "positive" : etf.ter < 1.0 ? "neutral" : "negative",
      description: "Annual management fee",
    },
    {
      label: "Assets Under Management",
      value: formatCompactNumber(etf.aum, "en-US", etf.currency),
      icon: TrendingUp,
      color: "green",
      trend:
        etf.aum > 1000000000
          ? "positive"
          : etf.aum > 100000000
          ? "neutral"
          : "negative",
      description: "Total fund size",
    },
    {
      label: "Fund Domicile",
      value: etf.locatedIn,
      icon: MapPin,
      color: "purple",
      description: "Legal jurisdiction",
    },
    {
      label: "Base Currency",
      value: etf.currency,
      icon: DollarSign,
      color: "orange",
      description: "Trading currency",
    },
    {
      label: "Fund Classification",
      value: etf.fundType,
      icon: Building2,
      color: "indigo",
      description: "Investment category",
    },
    {
      label: "Distribution Method",
      value: etf.returnMethod,
      icon: Coins,
      color: "teal",
      description: "How returns are paid",
    },
    {
      label: "Distribution Yield",
      value:
        etf.distributionReturn && etf.distributionReturn !== "-"
          ? `${etf.distributionReturn}%`
          : "None",
      icon: Award,
      color: "pink",
      description: "Annual distribution rate",
    },
    {
      label: "Last Updated",
      value: formatDate(etf.lastUpdate, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      icon: Calendar,
      color: "gray",
      description: "Data freshness",
    },
  ];

  const getColorClasses = (color: string, trend?: string) => {
    const baseColors = {
      blue: "from-blue-500 to-cyan-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
      green:
        "from-green-500 to-emerald-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
      purple:
        "from-purple-500 to-violet-500 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
      orange:
        "from-orange-500 to-red-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300",
      indigo:
        "from-indigo-500 to-blue-500 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300",
      teal: "from-teal-500 to-cyan-500 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300",
      pink: "from-pink-500 to-rose-500 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300",
      gray: "from-gray-500 to-slate-500 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300",
    };

    return baseColors[color as keyof typeof baseColors] || baseColors.blue;
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "positive":
        return "🟢";
      case "negative":
        return "🔴";
      case "neutral":
        return "🟡";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colorClasses = getColorClasses(metric.color, metric.trend);

        return (
          <Card
            key={index}
            className={`border transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer ${
              colorClasses.split("text-")[0]
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                      {metric.label}
                    </p>
                    {metric.trend && (
                      <span className="text-xs">
                        {getTrendIcon(metric.trend)}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xl font-bold transition-colors group-hover:scale-110 transform duration-300 ${
                      colorClasses.split("bg-")[1].split(" ")[2]
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {metric.description}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${
                    colorClasses.split(" ")[0]
                  } group-hover:shadow-lg transition-all duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export const ETFInfo: React.FC<ETFInfoProps> = ({ etf, loading = false }) => {
  if (loading || !etf) {
    return <ETFInfoSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="relative p-8 lg:p-12">
            <div className="text-center space-y-6">
              {/* ETF Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>

              {/* Main Info */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
                  {etf.name}
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-2xl font-mono font-bold text-primary-600 dark:text-primary-400">
                    {etf.ticker}
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/70 dark:bg-gray-800/70 rounded-full border border-white/20">
                    <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {etf.locatedIn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Badges */}
              <PremiumBadges etf={etf} />

              {/* Action Buttons */}
              <ActionButtons etf={etf} />
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Key Metrics Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Fund Details
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete overview of fund characteristics and metrics
            </p>
          </div>
        </div>

        <KeyMetrics etf={etf} />
      </div>

      {/* Additional Info Card */}
      <Card className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                About This ETF
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong>{etf.ticker}</strong> is a{" "}
                <strong>{etf.fundType.toLowerCase()}</strong> fund domiciled in{" "}
                <strong>{etf.locatedIn}</strong> and traded in{" "}
                <strong>{etf.currency}</strong>. The fund has an expense ratio
                of <strong>{formatPercentage(etf.ter)}</strong> and manages
                assets worth{" "}
                <strong>
                  {formatCompactNumber(etf.aum, "en-US", etf.currency)}
                </strong>
                .
                {etf.distributionReturn && etf.distributionReturn !== "-" ? (
                  <span>
                    {" "}
                    It offers a distribution yield of{" "}
                    <strong>
                      {etf.distributionReturn && etf.distributionReturn !== "-"
                        ? `${etf.distributionReturn}%`
                        : "None"}
                    </strong>
                    .
                  </span>
                ) : (
                  <span> It does not offers a distribution yield.</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
