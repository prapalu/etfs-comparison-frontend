import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  GitCompare,
  PieChart,
  Rocket,
  Search,
} from "lucide-react";
import Link from "next/link";

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

export default GettingStarted;
