"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface Etf {
  ticker: string;
  name: string;
}

interface JobStatus {
  id: string;
  status: string;
  processed: number;
  total: number;
  progress: number;
  error?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ComparisonPage() {
  const [etfs, setEtfs] = useState<Etf[]>([]);
  const [firstEtf, setFirstEtf] = useState<string>("");
  const [secondEtf, setSecondEtf] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [comparison, setComparison] = useState<any>(null);

  // carica lista etf dal backend
  useEffect(() => {
    axios.get(`${API_URL}/etf`).then((res) => setEtfs(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ETF Comparison</h1>

      {/* ETF selection */}
      <div className="mb-4">
        <label className="block mb-2">Select ETFs:</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select first Etf" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Etf</SelectLabel>
              {etfs.map((etf) => (
                <SelectItem
                  key={etf.ticker}
                  value={etf.ticker}
                  onClick={() => setFirstEtf(etf.ticker)}
                >
                  {etf.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* ETF selection */}
      <div className="mb-4">
        <label className="block mb-2">Select ETFs:</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select second Etf" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Etf</SelectLabel>
              {etfs.map((etf) => (
                <SelectItem
                  key={etf.ticker}
                  value={etf.ticker}
                  onClick={() => setSecondEtf(etf.ticker)}
                >
                  {etf.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Date picker */}
      <div className="mb-4">
        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          className="border rounded p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Job status */}
      {jobStatus && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Job Status</h2>
          <p>Status: {jobStatus.status}</p>
          <p>
            Progress: {jobStatus.processed}/{jobStatus.total} (
            {jobStatus.progress}%)
          </p>
          {jobStatus.error && (
            <p className="text-red-500">Error: {jobStatus.error}</p>
          )}
        </div>
      )}

      {/* Results */}
      {comparison && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Comparison Results</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(comparison, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
