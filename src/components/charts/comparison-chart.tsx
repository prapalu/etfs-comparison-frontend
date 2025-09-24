"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton";
import { formatPercentage } from "@/lib/utils";
import { ComparisonResult, ETF } from "@/types/etf";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  comparison: ComparisonResult | null;
  etf1: ETF;
  etf2: ETF;
  loading?: boolean;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  comparison,
  etf1,
  etf2,
  loading = false,
}) => {
  const { theme } = useTheme();

  if (loading || !comparison) {
    return <ChartSkeleton height="h-96" />;
  }

  const textColor = theme === "dark" ? "#f3f4f6" : "#374151";
  const gridColor = theme === "dark" ? "#374151" : "#e5e7eb";

  // Overlap comparison chart
  const overlapData = comparison.overlap
    .sort((a, b) => b.overlap_weight - a.overlap_weight)
    .slice(0, 15); // Top 15 overlapping holdings

  const chartData = {
    labels: overlapData.map((item) => item.ticker),
    datasets: [
      {
        label: etf1.ticker,
        data: overlapData.map((item) => item.weight_etf1),
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
      {
        label: etf2.ticker,
        data: overlapData.map((item) => item.weight_etf2),
        backgroundColor: "#ef4444",
        borderColor: "#dc2626",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          // Custom title with full company name
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const item = overlapData[index];
            return [item.ticker, item.name]; // Show both ticker and full name
          },
          // Enhanced label with more details
          label: function (context) {
            const item = overlapData[context.dataIndex];
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            const percentage = formatPercentage(value);

            return `${datasetLabel}: ${percentage}`;
          },
          // Add footer with overlap info
          footer: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const item = overlapData[index];
            return `Overlap Weight: ${formatPercentage(item.overlap_weight)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          maxRotation: 45,
          callback: function (value, index) {
            // Show truncated ticker if too long
            const ticker = overlapData[index]?.ticker || "";
            return ticker.length > 6 ? ticker.substring(0, 6) + "..." : ticker;
          },
        },
        grid: {
          color: gridColor,
          display: false, // Hide vertical grid lines for cleaner look
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
          callback: function (value) {
            return formatPercentage(Number(value));
          },
        },
        grid: {
          color: gridColor,
          display: true,
        },
        border: {
          display: false,
        },
      },
    },
    // Custom event handlers for x-axis labels
    onHover: (event, activeElements, chart) => {
      // Change cursor when hovering over chart area
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <div className="space-y-6">
      <Card className="fade-in">
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <CardTitle className="mb-2 lg:mb-0">
              Top Overlapping Holdings: {etf1.ticker} vs {etf2.ticker}
            </CardTitle>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Hover over bars for detailed information
            </div>
          </div>

          <div className="h-96 relative">
            <Bar data={chartData} options={options} />
          </div>

          {/* Legend below chart with full names */}
          <div className="mt-4 max-h-32 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Names:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
              {overlapData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="font-mono font-semibold text-primary-600 dark:text-primary-400 min-w-[60px]">
                    {item.ticker}
                  </span>
                  <span className="truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {formatPercentage(comparison.total_overlap)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Portfolio Overlap
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Combined weight of shared holdings
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {comparison.unique_etf1.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Unique to {etf1.ticker}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Holdings not in {etf2.ticker}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {comparison.unique_etf2.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Unique to {etf2.ticker}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Holdings not in {etf1.ticker}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional insights */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Overlapping Holdings:
                </span>
                <span className="font-medium">{comparison.overlap.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Largest Overlap:
                </span>
                <span className="font-medium">
                  {overlapData[0]?.ticker} (
                  {formatPercentage(overlapData[0]?.overlap_weight || 0)})
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Portfolio Similarity:
                </span>
                <span className="font-medium">
                  {comparison.total_overlap > 50
                    ? "High"
                    : comparison.total_overlap > 25
                    ? "Medium"
                    : "Low"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Diversification:
                </span>
                <span className="font-medium">
                  {comparison.total_overlap < 30
                    ? "Good"
                    : comparison.total_overlap < 60
                    ? "Moderate"
                    : "Limited"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
