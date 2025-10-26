import { cn } from "@/lib/cn/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

export default function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn("relative w-auto h-full", className)}>
      {/* Image skeleton */}
      <div className="relative w-full aspect-[3/4] bg-gray-200 animate-pulse mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      </div>
      
      {/* Product info skeleton */}
      <div className="product-info text-center mt-2 space-y-2">
        {/* Product name skeleton */}
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mx-auto" />
        
        {/* Brief description skeleton */}
        {/* <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2 mx-auto" /> */}
        
        {/* Price skeleton */}
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mx-auto" />
      </div>
    </div>
  );
}
