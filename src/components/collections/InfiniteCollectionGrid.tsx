"use client";

import { GridProductSkeletonCards, ProductCardSkeleton } from "@/components";
import ClientProductCard from "@/components/productCard/ClientProductCard";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import useProductsPaginatedQuery from "./queries/useProductsPaginated";

interface InfiniteCollectionGridProps {
  collection: string;
  collectionMetaKey?: string;
  collectionMetaValue?: string;
}

// Media query breakpoints
const MediaQuerySizes = {
  SM: 640,
  MD: 840,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export default function InfiniteCollectionGrid({
  collection,
  collectionMetaKey,
  collectionMetaValue,
}: InfiniteCollectionGridProps) {

  const [imagesLoading, setImagesLoading] = useState<Record<string, boolean>>({});
  const [columns, setColumns] = useState<number>(2);
  const parentRef = useRef<HTMLDivElement>(null);
  
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage, error, isFetching} = useProductsPaginatedQuery({
    limit: 10,
    lastProductId: undefined,
    collection,
    collectionMetaKey,
    collectionMetaValue,
  });

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  // Calculate number of rows needed
  const rowsLength = Math.ceil(products.length / columns);

  // Row virtualizer for vertical scrolling
  const rowVirtualizer = useWindowVirtualizer({
    count: rowsLength,
    estimateSize: () => 450,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
    gap: 16,
  });

  // Column virtualizer for horizontal scrolling
  const columnVirtualizer = useWindowVirtualizer({
    horizontal: true,
    count: columns,
    estimateSize: () => 250,
    gap: 16
  });

  // Update columns based on viewport size
  const updateColumns = () => {
    if (window.matchMedia(`(min-width: ${MediaQuerySizes.LG}px)`).matches) {
      setColumns(3);
    } else if (window.matchMedia(`(min-width: ${MediaQuerySizes.MD}px)`).matches) {
      setColumns(3);
    } else if (window.matchMedia(`(min-width: ${MediaQuerySizes.SM}px)`).matches) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };

  // Set up responsive columns
  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const virtualItems = rowVirtualizer.getVirtualItems();

  // Infinite scroll detection
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!hasNextPage || isFetchingNextPage || !lastItem) return;
    const lastRowIndex = Math.ceil(products.length / columns) - 1;
    if (lastItem.index >= lastRowIndex) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, virtualItems]);

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
      <div ref={parentRef} className="w-full">
        <div
          className="w-full relative will-change-transform"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`
          }}
        >
          {virtualItems.map((virtualRow) => {
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="grid gap-4 w-full absolute top-0 left-0 grid-cols-2 lg:grid-cols-3"
                style={{
                  transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`
                }}
              >
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  const itemIndex = virtualRow.index * columns + virtualColumn.index;
                  const product = products[itemIndex];
                  
                  if (!product) {
                    return null;
                  }

                  return (
                    <div 
                      key={virtualColumn.key} 
                      data-index={virtualColumn.index} 
                      ref={columnVirtualizer.measureElement}
                    >
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
                  );
                })}
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
