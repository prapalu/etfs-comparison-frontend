import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default FeatureCard;
