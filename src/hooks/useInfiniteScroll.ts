"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { Stripe } from 'stripe';

interface UseInfiniteScrollProps {
  fetchFunction: (limit: number, lastProductId?: string) => Promise<{
    data: Stripe.Product[];
    hasMore: boolean;
    lastProductId?: string;
    nextPage?: string;
  }>;
  limit?: number;
}

export const useInfiniteScroll = ({ 
  fetchFunction, 
  limit = 10 
}: UseInfiniteScrollProps) => {
  const [products, setProducts] = useState<Stripe.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastProductId, setLastProductId] = useState<string | undefined>();
  const [nextPage, setNextPage] = useState<string | undefined>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const observer = useRef<IntersectionObserver>(null);

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(limit, nextPage || lastProductId);
      
      setProducts(prev => {
        // Filter out duplicates based on product ID
        const existingIds = new Set(prev.map(p => p.id));
        const newProducts = result.data.filter(p => !existingIds.has(p.id));
        return [...prev, ...newProducts];
      });
      setHasMore(result.hasMore);
      setLastProductId(result.lastProductId);
      setNextPage(result.nextPage);
      setIsInitialLoad(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setIsInitialLoad(false);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction, limit, nextPage, lastProductId]);

  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        console.log("fetching more");
        fetchMore();
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore, fetchMore]);

  const reset = useCallback(() => {
    setProducts([]);
    setHasMore(true);
    setLastProductId(undefined);
    setNextPage(undefined);
    setError(null);
    setIsInitialLoad(true);
  }, []);

  // Initial fetch
  useEffect(() => {
    if (isInitialLoad && products.length === 0 && !isLoading) {
      fetchMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoad]);

  return {
    products,
    isLoading,
    hasMore,
    error,
    lastProductRef,
    fetchMore,
    reset,
    isInitialLoad,
  };
};
