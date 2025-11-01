"use client";
import { getActiveProducts } from "@/actions/stripe";
import { cn } from "@/lib/cn/utils";
import { useCartActions, useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

export default function CookieWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { getCartData } = useCartActions();
  const fetchActiveProductIds = async () => {
    const activeProducts = await getActiveProducts();
    return activeProducts.map((product) => product.id);
  };
  useEffect(() => {
    async function fetchCartData() {
      const activeProductIds = await fetchActiveProductIds();
      console.log(activeProductIds);
      const cartData = getCartData(activeProductIds);
      if (cartData) {
        useCartStore.setState({
          products: cartData.products,
          createdAt: cartData.createdAt,
          expiresAt: cartData.expiresAt,
          isExpired: cartData.isExpired,
        });
      }
    }
    fetchCartData();
  }, [getCartData]);

  return <div className={cn(className)}>{children}</div>;
}
