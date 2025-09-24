import { Card, CardContent } from "@/components/ui/card";
import { Activity, BarChart3, Target, Users } from "lucide-react";

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

export default StatsSection;
