"use client";

import { getCartProductsClient } from "@/actions/getCart/client";
import { getPriceId, retrievePrice } from "@/actions/stripe";
import { cn } from "@/lib/cn/utils";
import { HORIZONTAL_LINE_OFFSET_Y_RIGHT } from "@/lib/constants";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import { useCartProducts } from "@/stores/cartStore";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import Stripe from "stripe";
import CheckoutButton from "../checkout/checkoutButton";
import RemoveItem from "../removeItem";

type Price = {
    amount: number | null,
    currency: string,
    type: Stripe.Price.Type,
    currency_options: { [key: string]: Stripe.Price.CurrencyOptions } | undefined,
}

// Price cache hook for memoization
function usePriceCache() {
  const [priceCache, setPriceCache] = useState<{ [key: string]: Price }>({});
  
  const getCachedPrice = useCallback((productId: string) => {
    return priceCache[productId];
  }, [priceCache]);
  
  const setCachedPrice = useCallback((productId: string, price: Price) => {
    setPriceCache(prev => ({ ...prev, [productId]: price }));
  }, []);
  
  const clearCache = useCallback(() => {
    setPriceCache({});
  }, []);
  
  return { getCachedPrice, setCachedPrice, clearCache, priceCache };
}

// Loading skeleton components
function ProductImageSkeleton() {
  return (
    <div className="relative flex flex-col gap-2 text-secondary w-[50%] aspect-[3/4] bg-secondary loading-shimmer">
      <div className="h-full w-full bg-secondary rounded loading-shimmer">
        
      </div>
    </div>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="relative flex flex-col gap-2 text-secondary flex-1 px-[0.5rem]">
      <div className="flex flex-row gap-2 justify-between">
        <div className="h-4 bg-secondary rounded loading-shimmer flex-1"></div>
        <div className="w-6 h-4 bg-secondary rounded loading-shimmer"></div>
      </div>
      <div className="h-3 bg-secondary rounded loading-shimmer w-20"></div>
    </div>
  );
}

function CartItemSkeleton() {
  return (
    <div className="flex flex-row w-full">
      <ProductImageSkeleton />
      <ProductInfoSkeleton />
    </div>
  );
}

// Extract cart content as a separate component
function CartContent({
  cartProducts,
  isLoading,
  className,
  isMobile = false,
}: {
  cartProducts: Stripe.Product[];
  isLoading: boolean;
  className?: string;
  isMobile?: boolean;
}) {
  const { getCachedPrice, setCachedPrice } = usePriceCache();
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const isEmpty = cartProducts.length === 0;
  
  // Memoized cart data calculation
  const cartData = useMemo(() => {
    if (cartProducts.length === 0) {
      return { totalPrice: 0, currency: "", prices: {} };
    }
    
    let totalPrice = 0;
    let currency = "";
    const prices: { [key: string]: Price } = {};
    
    // Use cached prices where available
    for (const product of cartProducts) {
      const cachedPrice = getCachedPrice(product.id);
      if (cachedPrice) {
        prices[product.id] = cachedPrice;
        totalPrice += cachedPrice.amount ?? 0;
        if (!currency) currency = cachedPrice.currency;
      }
    }
    
    return { totalPrice, currency, prices };
  }, [cartProducts, getCachedPrice]);
  
  // Optimized price fetching with caching
  const fetchMissingPrices = useCallback(async () => {
    if (cartProducts.length === 0) return;
    
    // Find products that don't have cached prices
    const missingProducts = cartProducts.filter(product => !getCachedPrice(product.id));
    if (missingProducts.length === 0) return;
    
    setIsPriceLoading(true);
    
    try {
      // Fetch all missing prices in parallel
      const pricePromises = missingProducts.map(async (product) => {
        const priceId = await getPriceId(product.id);
        const price = await retrievePrice(priceId);
        setCachedPrice(product.id, price);
        return { productId: product.id, price };
      });
      
      await Promise.all(pricePromises);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setIsPriceLoading(false);
    }
  }, [cartProducts, getCachedPrice, setCachedPrice]);
  
  // Single effect to handle all cart data loading
  useEffect(() => {
    fetchMissingPrices();
  }, [fetchMissingPrices]);

  return (
    <div
      className={cn("flex-1 flex flex-col min-h-0", className)}
      style={{
        ...(!isMobile && {
          marginTop: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem`,
          height: `calc(100% - ${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem)`,
        }),
      }}
    >
      {isLoading ? (
        <div
          className="flex flex-col flex-1 gap-5 w-full text-secondary overflow-y-auto no-scrollbar"
          {...(!isMobile && {
            style: {
              paddingRight: "0.4rem",
            },
          })}
        >
          {/* Show skeleton loading for 3 items */}
          {Array.from({ length: 3 }).map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col flex-1 gap-5 w-full text-secondary overflow-y-auto no-scrollbar"
          {...(!isMobile && {
            style: {
              paddingRight: "0.4rem",
            },
          })}
        >
          {cartProducts.map((product) => (
            <div key={product.id} className="flex flex-row w-full">
              <div
                className={cn(
                  "relative flex flex-col gap-2 text-secondary w-[50%] aspect-[3/4]"
                )}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
                {product.name}
              </div>
              <div
                className={cn(
                  "relative flex flex-col gap-2 text-secondary flex-1 px-[0.5rem]"
                )}
              >
                <RemoveItem
                  productId={product.id}
                  className="flex flex-row gap-2 justify-between"
                >
                  <p>{product.name}</p>
                </RemoveItem>
                {isPriceLoading && !cartData.prices[product.id] ? (
                  <div className="h-3 bg-secondary rounded loading-shimmer w-20"></div>
                ) : (
                  <p className="text-secondary text-[0.7rem] md:text-[0.8rem]">{cartData.prices[product.id]?.amount ?? 0} {cartData.prices[product.id]?.currency.toUpperCase()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-1 pb-4 md:p-0">
        {/* TODO: price in total */}
        <p className="text-secondary mb-3 md:mb-2 text-[0.7rem]">
          shipping and taxes calculated at checkout
        </p>
        <CheckoutButton
          totalPrice={cartData.totalPrice}
          currency={cartData.currency}
          disabled={isLoading || isEmpty || isPriceLoading}
        />
      </div>
    </div>
  );
}

export default function CartPopup({ className }: { className?: string }) {
  const isCartOpen = useIsCartOpen();
  const { toggleCart } = useAppActions();
  const [cartProducts, setCartProducts] = useState<Stripe.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartProductIds = useCartProducts();

  // Memoized cart products loading
  const loadCartProducts = useCallback(async () => {
    if (cartProductIds.length === 0) {
      setCartProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const products = await getCartProductsClient(cartProductIds);
      setCartProducts(products);
    } catch (error) {
      console.error('Error loading cart products:', error);
      setCartProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [cartProductIds]);

  // Single effect for cart data loading
  useEffect(() => {
    loadCartProducts();
  }, [loadCartProducts]);

  // Manage body class for global styling
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("cart-open");
    };
  }, [isCartOpen]);

  return (
    <>
      {/* cartpopup z index 14 */}
      <div
        className={cn(
          "relative block md:hidden z-10 cart-open:z-19 cart-popup",
          className
        )}
      >
        <div
          className={cn(
            "fixed top-0 w-screen bg-primary p-2 pt-15 transition-all duration-300 ease-in-out",
            isCartOpen ? "right-0" : "-right-full",
            "h-screen flex flex-col"
          )}
        >
          <div className="relative mb-6 mr-3 after:right-0 after:bottom-2 after:absolute md:hidden block after:content-[''] after:block after:h-[3px] after:w-[75%] after:bg-secondary after:mt-[-0.8rem]">
            <h1 className="text-secondary text-nowrap text-[2.5rem] md:text-(length:--desktop-header-text-size) text-right">
              Cart ({cartProducts.length})
            </h1>
          </div>
          <CartContent
            cartProducts={cartProducts}
            isLoading={isLoading}
            isMobile={true}
          />
        </div>
      </div>
      <div className={cn("fixed h-screen hidden md:block", className)}>
        {isCartOpen && <div className="fixed inset-0" onClick={toggleCart} />}
        <div
          className={cn(
            "fixed top-0 h-full bg-primary p-8 md:p-[1.5rem] md:pr-[3rem] transition-all duration-300 ease-in-out"
          )}
          style={{
            width: "26rem",
            right: isCartOpen ? "0" : "-26rem",
          }}
        >
          <CartContent cartProducts={cartProducts} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export { CartContent };
