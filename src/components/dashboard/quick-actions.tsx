import { Card, CardContent } from "@/components/ui/card";
import { Download, Filter, GitCompare, Search } from "lucide-react";
import Link from "next/link";

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

export default QuickActions;
