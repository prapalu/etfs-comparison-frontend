import type {
  AllocationKPI,
  ChartDataset,
  Holding,
  ProcessedAllocation,
} from "@/types/etf";
import { ChartOptions, TooltipItem } from "chart.js";
import { CHART_COLORS, CHART_CONFIG } from "./constants";
import { formatPercentage } from "./utils";

/**
 * Get chart colors for specified count
 */
export function getChartColors(
  count: number,
  palette: "PRIMARY" | "SECONDARY" | "MUTED" = "PRIMARY"
): string[] {
  const colors = CHART_COLORS[palette];
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }

  return result;
}

/**
 * Get base chart options with theme support
 */
export function getBaseChartOptions(isDark: boolean): ChartOptions {
  const textColor = isDark ? "#f3f4f6" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const backgroundColor = isDark ? "#1f2937" : "#ffffff";

  return {
    responsive: CHART_CONFIG.RESPONSIVE,
    maintainAspectRatio: CHART_CONFIG.MAINTAIN_ASPECT_RATIO,
    animation: {
      duration: CHART_CONFIG.ANIMATION_DURATION,
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: textColor,
          font: {
            size: 11,
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
      y: {
        type: "linear",
        ticks: {
          color: textColor,
          font: {
            size: 11,
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
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
      },
    },
  };
}

/**
 * Get pie chart options
 */
export function getPieChartOptions(
  isDark: boolean,
  showLegend = true
): ChartOptions<"pie"> {
  const textColor = isDark ? "#f3f4f6" : "#374151";
  const backgroundColor = isDark ? "#1f2937" : "#ffffff";
  const gridColor = isDark ? "#374151" : "#e5e7eb";

  return {
    responsive: CHART_CONFIG.RESPONSIVE,
    maintainAspectRatio: CHART_CONFIG.MAINTAIN_ASPECT_RATIO,
    animation: {
      duration: CHART_CONFIG.ANIMATION_DURATION,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const label = context.label || "";
            const value = context.parsed;
            const percentage = formatPercentage(value);
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };
}

/**
 * Get doughnut chart options
 */
export function getDoughnutChartOptions(
  isDark: boolean,
  showLegend = true,
  cutout = "50%"
): ChartOptions<"doughnut"> {
  const textColor = isDark ? "#f3f4f6" : "#374151";
  const backgroundColor = isDark ? "#1f2937" : "#ffffff";
  const gridColor = isDark ? "#374151" : "#e5e7eb";

  return {
    responsive: CHART_CONFIG.RESPONSIVE,
    maintainAspectRatio: CHART_CONFIG.MAINTAIN_ASPECT_RATIO,
    cutout,
    animation: {
      duration: CHART_CONFIG.ANIMATION_DURATION,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = context.parsed;
            const percentage = formatPercentage(value);
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };
}

/**
 * Get bar chart options
 */
export function getBarChartOptions(
  isDark: boolean,
  stacked = false
): ChartOptions<"bar"> {
  const textColor = isDark ? "#f3f4f6" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const backgroundColor = isDark ? "#1f2937" : "#ffffff";

  return {
    responsive: CHART_CONFIG.RESPONSIVE,
    maintainAspectRatio: CHART_CONFIG.MAINTAIN_ASPECT_RATIO,
    animation: {
      duration: CHART_CONFIG.ANIMATION_DURATION,
    },
    scales: {
      x: {
        type: "category",
        stacked,
        ticks: {
          color: textColor,
          font: {
            size: 11,
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
      y: {
        type: "linear",
        stacked,
        beginAtZero: true,
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
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
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${formatPercentage(value)}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
      },
    },
  };
}

/**
 * Get line chart options for time series
 */
export function getLineChartOptions(
  isDark: boolean,
  showPoints = true
): ChartOptions<"line"> {
  const textColor = isDark ? "#f3f4f6" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const backgroundColor = isDark ? "#1f2937" : "#ffffff";

  return {
    responsive: CHART_CONFIG.RESPONSIVE,
    maintainAspectRatio: CHART_CONFIG.MAINTAIN_ASPECT_RATIO,
    animation: {
      duration: CHART_CONFIG.ANIMATION_DURATION,
    },
    elements: {
      point: {
        radius: showPoints ? 4 : 0,
        hoverRadius: showPoints ? 6 : 4,
      },
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            month: "MMM yyyy",
            quarter: "MMM yyyy",
            year: "yyyy",
          },
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
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
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
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
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${formatPercentage(value)}`;
          },
        },
      },
    },
  };
}

/**
 * Aggregate holdings by specified key
 */
export function aggregateHoldingsByKey(
  holdings: Holding[],
  key: AllocationKPI,
  limit = 10,
  includeOthers = true
): ProcessedAllocation {
  if (!holdings.length) {
    return { labels: [], values: [], colors: [] };
  }

  const aggregated: Record<string, number> = {};

  holdings.forEach((holding) => {
    const keyValue = holding[key] || "Other";
    aggregated[keyValue] =
      (aggregated[keyValue] || 0) + (holding.weight_pct || 0);
  });

  // Sort by value and take top items
  let sorted = Object.entries(aggregated).sort(([, a], [, b]) => b - a);

  // Handle "Others" category for items beyond the limit
  if (includeOthers && sorted.length > limit) {
    const topItems = sorted.slice(0, limit - 1);
    const otherItems = sorted.slice(limit - 1);
    const othersSum = otherItems.reduce((sum, [, value]) => sum + value, 0);

    if (othersSum > 0) {
      topItems.push(["Others", othersSum]);
    }

    sorted = topItems;
  } else {
    sorted = sorted.slice(0, limit);
  }

  const labels = sorted.map(([key]) => key);
  const values = sorted.map(([, value]) => value);
  const colors = getChartColors(labels.length);

  return { labels, values, colors };
}

/**
 * Process time series data for evolution charts
 */
export function processTimeSeriesData(
  histories: Array<{ date: string; holdings: Holding[] }>,
  kpi: AllocationKPI,
  topN = 8
): {
  dates: string[];
  datasets: ChartDataset[];
} {
  if (!histories.length) {
    return { dates: [], datasets: [] };
  }

  // Sort histories by date
  const sortedHistories = [...histories].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dates = sortedHistories.map((h) => h.date);
  const allCategories = new Set<string>();

  // Collect all categories across all histories
  sortedHistories.forEach((history) => {
    history.holdings.forEach((holding) => {
      const category = holding[kpi] || "Other";
      allCategories.add(category);
    });
  });

  // Build data structure for each category
  const categoryData: Record<string, number[]> = {};

  allCategories.forEach((category) => {
    categoryData[category] = new Array(sortedHistories.length).fill(0);
  });

  // Fill in the data for each history
  sortedHistories.forEach((history, index) => {
    const aggregated = aggregateHoldingsByKey(
      history.holdings,
      kpi,
      100,
      false
    );

    aggregated.labels.forEach((label, labelIndex) => {
      if (categoryData[label]) {
        categoryData[label][index] = aggregated.values[labelIndex];
      }
    });
  });

  // Get top categories based on average values
  const topCategories = Object.entries(categoryData)
    .map(([category, values]) => ({
      category,
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, topN);

  // Create datasets
  const colors = getChartColors(topCategories.length);
  const datasets: ChartDataset[] = topCategories.map(({ category }, index) => ({
    label: category,
    data: categoryData[category],
    backgroundColor: colors[index],
    borderColor: colors[index],
    borderWidth: 1,
    borderRadius: 4,
    borderSkipped: false,
  }));

  return { dates, datasets };
}

/**
 * Generate comparison chart data
 */
export function generateComparisonData(
  overlapData: Array<{
    ticker: string;
    name: string;
    weight_etf1: number;
    weight_etf2: number;
  }>,
  etf1Label: string,
  etf2Label: string,
  maxItems = 15
): {
  labels: string[];
  datasets: ChartDataset[];
} {
  const sortedData = overlapData
    .sort(
      (a, b) => b.weight_etf1 + b.weight_etf2 - (a.weight_etf1 + a.weight_etf2)
    )
    .slice(0, maxItems);

  const labels = sortedData.map((item) => item.ticker);

  const datasets: ChartDataset[] = [
    {
      label: etf1Label,
      data: sortedData.map((item) => item.weight_etf1),
      backgroundColor: "#3b82f6",
      borderColor: "#2563eb",
      borderWidth: 1,
    },
    {
      label: etf2Label,
      data: sortedData.map((item) => item.weight_etf2),
      backgroundColor: "#ef4444",
      borderColor: "#dc2626",
      borderWidth: 1,
    },
  ];

  return { labels, datasets };
}

/**
 * Calculate chart statistics
 */
export function calculateChartStats(values: number[]): {
  total: number;
  average: number;
  max: number;
  min: number;
  median: number;
} {
  if (!values.length) {
    return { total: 0, average: 0, max: 0, min: 0, median: 0 };
  }

  const total = values.reduce((sum, val) => sum + val, 0);
  const average = total / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const sortedValues = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);
  const median =
    sortedValues.length % 2 !== 0
      ? sortedValues[mid]
      : (sortedValues[mid - 1] + sortedValues[mid]) / 2;

  return { total, average, max, min, median };
}

/**
 * Format chart data for export
 */
export function formatChartDataForExport(
  labels: string[],
  values: number[],
  format: "csv" | "json" = "csv"
): string {
  if (format === "json") {
    const data = labels.map((label, index) => ({
      category: label,
      value: values[index],
      percentage: formatPercentage(values[index]),
    }));
    return JSON.stringify(data, null, 2);
  }

  // CSV format
  const header = "Category,Value,Percentage\n";
  const rows = labels
    .map(
      (label, index) =>
        `"${label}",${values[index]},${formatPercentage(values[index])}`
    )
    .join("\n");

  return header + rows;
}

/**
 * Validate chart data
 */
export function validateChartData(
  labels: string[],
  values: number[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!labels.length) {
    errors.push("Labels array is empty");
  }

  if (!values.length) {
    errors.push("Values array is empty");
  }

  if (labels.length !== values.length) {
    errors.push("Labels and values arrays must have the same length");
  }

  if (values.some((val) => typeof val !== "number" || isNaN(val))) {
    errors.push("All values must be valid numbers");
  }

  if (values.some((val) => val < 0)) {
    errors.push("Values cannot be negative");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
