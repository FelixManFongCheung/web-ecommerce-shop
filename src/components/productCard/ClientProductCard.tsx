"use client";

import { cn } from "@/lib/cn/utils";
import Stripe from "stripe";
import { useEffect, useState } from "react";

interface ClientProductCardProps {
  product: Stripe.Product;
  children?: React.ReactNode;
  className?: string;
  noInfo?: boolean;
}

export default function ClientProductCard({
  product,
  children,
  className,
  noInfo = false,
}: ClientProductCardProps) {
  const [price, setPrice] = useState<{ amount: number; currency: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    
    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/price/${product.id}`, {
          signal: abortController.signal
        });
        const priceData = await response.json();
        
        if (isMounted) {
          setPrice(priceData);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching price:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!noInfo) {
      fetchPrice();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [product.id, noInfo]);

  return (
    <div className={cn("relative w-auto h-full", className)}>
      {children}
      {!noInfo && (
        <div className="product-info text-center mt-2">
          <div className="name">{product.name}</div>
          <div className="brief">{product.metadata.brief}</div>
          {isLoading ? (
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mx-auto" />
          ) : product.active ? (
            <div className="price">{price?.amount} {price?.currency?.toUpperCase()}</div>
          ) : (
            <div className="price">sold out</div>
          )}
        </div>
      )}
    </div>
  );
}
