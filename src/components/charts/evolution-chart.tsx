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
import { AllocationKPI, ETFHistory } from "@/types/etf";
import { format } from "date-fns";
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

interface EvolutionChartProps {
  histories: ETFHistory[];
  kpi: AllocationKPI;
  title: string;
  loading?: boolean;
}

export const EvolutionChart: React.FC<EvolutionChartProps> = ({
  histories,
  kpi,
  title,
  loading = false,
}) => {
  const { theme } = useTheme();

  const processData = () => {
    const sortedHistories = [...histories].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dates = sortedHistories.map((h) =>
      format(new Date(h.date), "MMM yyyy")
    );

    const kpiData: { [key: string]: number[] } = {};

    sortedHistories.forEach((history, historyIndex) => {
      const aggregated: { [key: string]: number } = {};

      history.holdings.forEach((holding) => {
        const key = holding[kpi] || "Other";
        aggregated[key] = (aggregated[key] || 0) + (holding.weight_pct || 0);
      });

      // Initialize arrays for new keys
      Object.keys(aggregated).forEach((key) => {
        if (!kpiData[key]) {
          kpiData[key] = new Array(sortedHistories.length).fill(0);
        }
      });

      // Fill data for this history
      Object.entries(aggregated).forEach(([key, value]) => {
        kpiData[key][historyIndex] = value;
      });
    });

    // Get top categories based on latest values
    const latestValues = Object.entries(kpiData)
      .map(([key, values]) => ({ key, value: values[values.length - 1] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return {
      dates,
      kpiData: Object.fromEntries(
        latestValues.map(({ key }) => [key, kpiData[key]])
      ),
    };
  };

  if (loading || !histories || histories.length === 0) {
    return <ChartSkeleton height="h-96" />;
  }

  const { dates, kpiData } = processData();

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
  ];

  const textColor = theme === "dark" ? "#f3f4f6" : "#374151";
  const gridColor = theme === "dark" ? "#374151" : "#e5e7eb";

  const datasets = Object.entries(kpiData).map(([key, values], index) => ({
    label: key,
    data: values,
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 1,
    borderRadius: 4,
    borderSkipped: false,
  }));

  const chartData = {
    labels: dates,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        stacked: true,
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
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          padding: 20,
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
            return `${context.dataset.label}: ${formatPercentage(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <Card className="fade-in">
      <CardContent>
        <CardTitle className="mb-6">{title}</CardTitle>
        <div className="h-96">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};
