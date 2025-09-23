"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton";
import { ComparisonResult, ETF } from "@/types/etf";
import { formatPercentage } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

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
        callbacks: {
          label: function (context) {
            const item = overlapData[context.dataIndex];
            return `${context.dataset.label}: ${formatPercentage(
              context.parsed.y
            )} (${item.name})`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          maxRotation: 45,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
          callback: function (value) {
            return formatPercentage(Number(value));
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <Card className="fade-in">
        <CardContent>
          <CardTitle className="mb-6">
            Top Overlapping Holdings: {etf1.ticker} vs {etf2.ticker}
          </CardTitle>
          <div className="h-96">
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {formatPercentage(comparison.total_overlap)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Overlap
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {comparison.unique_etf1.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Unique to {etf1.ticker}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {comparison.unique_etf2.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Unique to {etf2.ticker}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
