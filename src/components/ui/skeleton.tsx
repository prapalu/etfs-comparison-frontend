import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn("skeleton h-4 w-full", className)} {...props} />;
};

export const ETFCardSkeleton: React.FC = () => {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="pt-2">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
};

interface ChartSkeletonProps {
  height?: string;
}

export const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  height = "h-80",
}) => {
  return (
    <div className="card p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className={cn("w-full flex items-center justify-center", height)}>
        <div className="space-y-4 w-full max-w-sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5 }) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
};
