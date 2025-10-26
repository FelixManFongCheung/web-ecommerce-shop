"use client";

import { GridProductSkeletonCards, ProductCardSkeleton } from "@/components";
import ClientProductCard from "@/components/productCard/ClientProductCard";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef } from "react";
import { useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import useProductsPaginatedQuery from "./queries/useProductsPaginated";

interface InfiniteCollectionGridProps {
  collection: string;
  collectionMetaKey?: string;
  collectionMetaValue?: string;
}

export default function InfiniteCollectionGrid({
  collection,
  collectionMetaKey,
  collectionMetaValue,
}: InfiniteCollectionGridProps) {

  const [imagesLoading, setImagesLoading] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage, error, isFetching} = useProductsPaginatedQuery({
    limit: 10,
    lastProductId: undefined,
    collection,
    collectionMetaKey,
    collectionMetaValue,
  });

  const products = data?.pages.flatMap((page) => page.data) ?? [];
  console.log(products);

  // Group products into rows of 2 (mobile) or 3 (desktop)
  const itemsPerRow = 3; // desktop columns
  const rowCount = Math.ceil(products.length / itemsPerRow);
  
  const rows = Array.from({ length: rowCount }, (_, i) => ({
    index: i,
    items: products.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  }));

  const virtualiser = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 450, 
    overscan: 5,
  });

  const virtualItems = virtualiser.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!hasNextPage || isFetchingNextPage || !lastItem) return;
    const lastRowIndex = rowCount - 1;
    if (lastItem.index === lastRowIndex) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, virtualItems, rowCount, fetchNextPage]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error.message || String(error)}</p>
      </div>
    );
  }

  if (products.length === 0 && !isFetchingNextPage && !isFetching && !hasNextPage && !error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-header-height-mobile md:mt-header-height">
        <div>No products found</div>
      </div>
    );
  }

  if (isFetchingNextPage || (products.length === 0 && !error)) {
    return <GridProductSkeletonCards />;
  }

  return (
    <>
      <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto">
        <div 
          style={{ height: `${virtualiser.getTotalSize()}px`, width: '100%', position: 'relative' }}
        >
          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={`row-${row.index}`}
                ref={virtualiser.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-14">
                  {row.items.map((product, idx) => (
                    <div key={`${product.id}-${idx}`}>
                      <Suspense fallback={<ProductCardSkeleton />}>
                        <ClientProductCard  
                          product={product} 
                          className="mb-6"
                        >
                          <Link
                            className={cn("relative block w-full aspect-[3/4]")}
                            href={`/products/${product.id}`}
                          >
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              placeholder="blur"
                              blurDataURL={`/_next/image?url=${product.images[0]}&w=16&q=1`}
                              loading="lazy"
                              fill
                              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                              onLoad={() => setImagesLoading((prev) => ({ ...prev, [product.id]: true }))}
                              onLoadingComplete={() => setImagesLoading((prev) => {
                                const current = { ...prev };
                                delete current[product.id];
                                return current;
                              })}
                              className={cn(
                                !product.active ? "opacity-80 hover:opacity-100" : "opacity-100",
                                imagesLoading[product.id] ? "bg-gray-200 animate-pulse" : "bg-none animate-none"
                              )}
                            />
                          </Link>
                        </ClientProductCard>
                      </Suspense>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {isFetchingNextPage && (
        <GridProductSkeletonCards />
      )}
      
      {!hasNextPage && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more products to load
        </div>
      )}
    </>
  );
}
