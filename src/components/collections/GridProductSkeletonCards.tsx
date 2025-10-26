import { ProductCardSkeleton } from "@/components";
import { cn } from "@/lib/cn/utils";

interface GridProductSkeletonCardsProps {
  length?: number;
  className?: string;
}

export default function GridProductSkeletonCards({length = 10, className}: GridProductSkeletonCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-3 md:gap-14 gap-1 auto-rows-max", className)}>
      {Array.from({ length: length }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} className="mb-6" />
      ))}
    </div>
  );
}