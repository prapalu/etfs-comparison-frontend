import { Github, Twitter, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ETF Analyzer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comprehensive ETF analysis and comparison tool for better
              investment decisions.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Portfolio Analysis</li>
              <li>ETF Comparison</li>
              <li>Historical Tracking</li>
              <li>Interactive Charts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@etfanalyzer.com"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 ETF Analyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
