import FeatureCard from "@/components/dashboard/featured-card";
import GettingStarted from "@/components/dashboard/getting-started";
import QuickActions from "@/components/dashboard/quick-actions";
import StatsSection from "@/components/dashboard/stats-section";
import { Button } from "@/components/ui/button";
import { ETFCardSkeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BarChart3,
  GitCompare,
  Play,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Dashboard() {
  const features = [
    {
      icon: BarChart3,
      title: "Analyze ETFs",
      description:
        "Deep dive into ETF compositions with interactive charts and detailed breakdowns of allocations",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600",
      gradient:
        "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      href: "/etfs",
    },
    {
      icon: TrendingUp,
      title: "Track Evolution",
      description:
        "Monitor how ETF allocations change over time with historical data and trend analysis",
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      gradient:
        "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      href: "/etfs",
    },
    {
      icon: GitCompare,
      title: "Compare ETFs",
      description:
        "Analyze overlaps and differences between ETFs with side-by-side comparisons and insights",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      gradient:
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      href: "/compare",
    },
    {
      icon: Users,
      title: "Holdings Insights",
      description:
        "Detailed breakdown of individual holdings with searchable tables and advanced filtering",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      gradient:
        "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      href: "/etfs",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative text-center px-8 py-16 lg:py-24">
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full opacity-10 animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse delay-1000" />

          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform animate-bounce">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
              ETF Analyzer
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            The most comprehensive platform to{" "}
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              analyze
            </span>
            ,
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {" "}
              compare
            </span>
            , and
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {" "}
              track
            </span>{" "}
            ETF portfolios with professional-grade insights and interactive
            visualizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/etfs">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Analyzing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/compare">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 border-2 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
              >
                <GitCompare className="w-5 h-5 mr-2" />
                Compare ETFs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <StatsSection />
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Powerful Analysis Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to make informed ETF investment decisions with
            professional-grade analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Jump straight into the action with these shortcuts
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Getting Started Guide */}
      <Suspense fallback={<ETFCardSkeleton />}>
        <GettingStarted />
      </Suspense>
    </div>
  );
}
