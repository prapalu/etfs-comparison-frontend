"use client";

import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton";
import { AllocationKPI, ChartType, ETFHistory } from "@/types/etf";
import { formatPercentage } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AllocationChartProps {
  data: ETFHistory | null;
  kpi: AllocationKPI;
  chartType?: ChartType;
  title: string;
  loading?: boolean;
}

export const AllocationChart: React.FC<AllocationChartProps> = ({
  data,
  kpi,
  chartType = "pie",
  title,
  loading = false,
}) => {
  const { theme } = useTheme();

  const aggregateData = () => {
    if (!data) return { labels: [], values: [] };

    const aggregated: { [key: string]: number } = {};

    data.holdings.forEach((holding) => {
      const key = holding[kpi] || "Other";
      aggregated[key] = (aggregated[key] || 0) + (holding.weight_pct || 0);
    });

    // Sort by value and take top 10
    const sorted = Object.entries(aggregated)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    return {
      labels: sorted.map(([key]) => key),
      values: sorted.map(([, value]) => value),
    };
  };

  if (loading || !data) {
    return <ChartSkeleton />;
  }

  const { labels, values } = aggregateData();

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ];

  const textColor = theme === "dark" ? "#f3f4f6" : "#374151";

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: theme === "dark" ? "#374151" : "#ffffff",
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${formatPercentage(context.parsed)}`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const ChartComponent = chartType === "doughnut" ? Doughnut : Pie;

  return (
    <Card className="fade-in">
      <CardContent>
        <CardTitle className="mb-6">{title}</CardTitle>
        <div className="h-80">
          <ChartComponent data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};
