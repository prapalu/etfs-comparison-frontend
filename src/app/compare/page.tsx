"use client";

import { ETFComparison } from "@/components/etf-comparison";
import { ChartSkeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { ETF } from "@/types/etf";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleCompare = async (etfId1: string, etfId2: string) => {
    try {
      return (await api.comparison.compare({ etf1: etfId1, etf2: etfId2 }))
        .comparison;
    } catch (error) {
      console.error("Comparison failed:", error);
      return null;
    }
  };

  if (loading) {
    return <ChartSkeleton height="h-96" />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          Error Loading Data
        </div>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Compare ETFs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze overlaps and differences between ETF holdings and allocations
        </p>
      </div>

      <ETFComparison etfs={etfs} onCompare={handleCompare} />
    </div>
  );
}
