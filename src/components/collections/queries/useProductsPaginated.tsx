"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsPaginated, searchProductsByMetaDataKeyAndValuePaginated } from "@/actions/stripe";

export default function useProductsPaginatedQuery({ limit, lastProductId, collection, collectionMetaKey, collectionMetaValue }: { limit: number, lastProductId?: string, collection: string, collectionMetaKey?: string, collectionMetaValue?: string }) {
  return useInfiniteQuery({
    queryKey: ["products-paginated", limit, lastProductId, collection, collectionMetaKey, collectionMetaValue],
    queryFn: async ({ pageParam }) => {
      if (collection === "all") {
        const result = await getProductsPaginated(limit, pageParam && typeof pageParam === 'string' ? pageParam : undefined);
        return result;
      } else if (collectionMetaKey && collectionMetaValue) {
        const result = await searchProductsByMetaDataKeyAndValuePaginated(collectionMetaKey, collectionMetaValue, limit, pageParam && typeof pageParam === 'string' ? pageParam : undefined);
        return result;
      } else {
        const result = await getProductsPaginated(limit, pageParam && typeof pageParam === 'string' ? pageParam : undefined);
        return result;
      }
    },
    initialPageParam: lastProductId || undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastProductId : undefined;
    },
  });
}