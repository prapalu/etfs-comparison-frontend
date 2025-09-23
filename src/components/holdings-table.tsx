"use client";

import { useState } from "react";
import { Holding } from "@/types/etf";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/ui/skeleton";
import { formatPercentage, formatCurrency } from "@/lib/utils";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

interface HoldingsTableProps {
  holdings: Holding[];
  loading?: boolean;
  title?: string;
}

interface SortIconProps {
  field: keyof Holding;
  sortField: keyof Holding;
  sortDirection: "asc" | "desc";
}

const SortIcon: React.FC<SortIconProps> = ({
  field,
  sortField,
  sortDirection,
}) => {
  if (sortField !== field) {
    return <div className="w-4 h-4" />;
  }
  return sortDirection === "asc" ? (
    <ChevronUp className="w-4 h-4" />
  ) : (
    <ChevronDown className="w-4 h-4" />
  );
};

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  loading = false,
  title = "Holdings",
}) => {
  const [sortField, setSortField] = useState<keyof Holding>("weight_pct");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSort = (field: keyof Holding) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const filteredHoldings = holdings.filter(
    (holding) =>
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.issuer_ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedHoldings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHoldings = sortedHoldings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <TableSkeleton rows={10} />;
  }

  return (
    <Card className="fade-in">
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <CardTitle>
            {title} ({filteredHoldings.length})
          </CardTitle>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search holdings..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("issuer_ticker")}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Ticker</span>
                    <SortIcon
                      field="issuer_ticker"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Name</span>
                    <SortIcon
                      field="name"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("weight_pct")}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Weight</span>
                    <SortIcon
                      field="weight_pct"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("sector")}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Sector</span>
                    <SortIcon
                      field="sector"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("region")}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Region</span>
                    <SortIcon
                      field="region"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-right"
                  onClick={() => handleSort("market_value")}
                >
                  <div className="flex items-center justify-end space-x-2">
                    <span className="font-medium">Market Value</span>
                    <SortIcon
                      field="market_value"
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedHoldings.map((holding, index) => (
                <tr
                  key={`${holding.issuer_ticker}-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-medium text-primary-600 dark:text-primary-400">
                    {holding.issuer_ticker}
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate" title={holding.name}>
                      {holding.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatPercentage(holding.weight_pct)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {holding.sector}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {holding.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(holding.market_value, "USD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredHoldings.length)} of{" "}
              {filteredHoldings.length}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <span className="px-3 py-1 text-sm bg-primary-600 text-white rounded">
                {currentPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
