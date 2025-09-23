import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ETFCardSkeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  TrendingUp,
  GitCompare,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  PieChart,
  Activity,
  Rocket,
  Play,
  ArrowUpRight,
  Search,
  Filter,
  Download,
} from "lucide-react";

// Enhanced Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  gradient: string;
  href: string;
}> = ({ icon: Icon, title, description, color, gradient, href }) => {
  return (
    <Link href={href} className="group block">
      <Card
        className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${gradient}`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradient
            .replace("from-", "from-")
            .replace(
              "to-",
              "to-"
            )} rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}
        />

        <CardContent className="relative p-8 text-center">
          {/* Icon container with floating animation */}
          <div
            className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${color} flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
          >
            <Icon className="w-10 h-10 text-white" />
          </div>

          <CardTitle className="text-xl mb-3 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-gray-100 dark:group-hover:to-gray-400 transition-all duration-300">
            {title}
          </CardTitle>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Action arrow */}
          <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
            <span className="text-sm font-medium mr-2">Get Started</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>

        {/* Corner decoration */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 ${color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        />
      </Card>
    </Link>
  );
};

// Stats component
const StatsSection = () => {
  const stats = [
    { label: "ETFs Available", value: "500+", icon: BarChart3 },
    { label: "Total Analysis", value: "10K+", icon: Activity },
    { label: "Data Points", value: "1M+", icon: Target },
    { label: "Users Served", value: "5K+", icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
          >
            <CardContent className="p-6 text-center">
              <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// Enhanced Getting Started Component
const GettingStarted = () => {
  const steps = [
    {
      number: 1,
      title: "Browse & Discover ETFs",
      description:
        "Explore our comprehensive database of ETFs with advanced filtering and search capabilities",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      action: "Browse ETFs",
      href: "/etfs",
    },
    {
      number: 2,
      title: "Analyze Holdings & Allocations",
      description:
        "Deep dive into detailed breakdowns by geography, sectors, and individual holdings with interactive charts",
      icon: PieChart,
      color: "from-green-500 to-emerald-500",
      action: "Start Analysis",
      href: "/etfs",
    },
    {
      number: 3,
      title: "Compare & Track Performance",
      description:
        "Compare different ETFs side-by-side and track allocation changes over time with historical data",
      icon: GitCompare,
      color: "from-purple-500 to-pink-500",
      action: "Compare ETFs",
      href: "/compare",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <CardContent className="relative p-8 lg:p-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Begin your ETF analysis journey with our comprehensive toolkit
            designed for both beginners and professionals
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center gap-8 group"
              >
                {/* Step number and icon */}
                <div className="flex-shrink-0 flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {step.number}
                    </span>
                  </div>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <Link href={step.href}>
                    <Button
                      variant="outline"
                      className="group/btn hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300"
                    >
                      <span className="mr-2">{step.action}</span>
                      <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>
                  </Link>
                </div>

                {/* Connector line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      icon: Search,
      title: "Quick Search",
      description: "Find ETFs instantly",
      color: "bg-blue-500",
      href: "/etfs",
    },
    {
      icon: Filter,
      title: "Smart Filter",
      description: "Filter by criteria",
      color: "bg-green-500",
      href: "/etfs",
    },
    {
      icon: GitCompare,
      title: "Compare Now",
      description: "Side-by-side analysis",
      color: "bg-purple-500",
      href: "/compare",
    },
    {
      icon: Download,
      title: "Export Data",
      description: "Download insights",
      color: "bg-orange-500",
      href: "/etfs",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link key={index} href={action.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

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
