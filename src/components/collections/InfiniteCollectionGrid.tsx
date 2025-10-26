"use client";

import { GridProductSkeletonCards, ProductCardSkeleton } from "@/components";
import ClientProductCard from "@/components/productCard/ClientProductCard";
import { cn } from "@/lib/cn/utils";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getProductsPaginated, searchProductsByMetaDataKeyAndValuePaginated } from "@/actions/stripe";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback } from "react";
import { useState } from "react";

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
  const fetchFunction = useCallback((limit: number, lastProductId?: string) => {
    if (collection === "all") {
      return getProductsPaginated(limit, lastProductId);
    } else if (collectionMetaKey && collectionMetaValue) {
      return searchProductsByMetaDataKeyAndValuePaginated(
        collectionMetaKey,
        collectionMetaValue,
        limit,
        lastProductId
      );
    } else {
      return getProductsPaginated(limit, lastProductId);
    }
  }, [collection, collectionMetaKey, collectionMetaValue]);

  const {
    products,
    isLoading,
    hasMore,
    error,
    lastProductRef,
    isInitialLoad,
  } = useInfiniteScroll({
    fetchFunction,
    limit: 10,
  });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0 && !isLoading && !isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-header-height-mobile md:mt-header-height">
        <div>No products found</div>
      </div>
    );
  }

  if (isInitialLoad || (products.length === 0 && isLoading)) {
    return (
        <GridProductSkeletonCards />
    );
  }

  if (products.length === 0 && !isLoading && !error) {
    return (
      <GridProductSkeletonCards />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-14 gap-1 auto-rows-max">
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            ref={index === products.length - 1 ? lastProductRef : null}
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
                        const current = prev;
                        delete current[product.id]
                        return current;
                    })}
                    className={cn(!product.active ? "opacity-80 hover:opacity-100": "opacity-100",
                      imagesLoading[product.id] ? "bg-gray-200 animate-pulse" : "bg-none animate-none")
                    }
                  />
                </Link>
              </ClientProductCard>
            </Suspense>
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-14 gap-1 auto-rows-max">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} className="mb-6" />
          ))}
        </div>
      )}
      
      {!hasMore && products.length > 0 && !isInitialLoad && (
        <div className="text-center py-8 text-gray-500">
          No more products to load
        </div>
      )}
    </div>
  );
}
