import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ETF Analyzer",
  description: "Analyze and compare ETF portfolios with detailed insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <ThemeProvider defaultTheme="system" storageKey="etf-analyzer-theme">
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
