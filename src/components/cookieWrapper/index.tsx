"use client";

import { cn } from "@/lib/cn/utils";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

export default function CookieWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { actions } = useCartStore();

  useEffect(() => {
    const cartData = actions.getCartData();
    if (cartData) {
      useCartStore.setState({
        products: cartData.products,
        createdAt: cartData.createdAt,
        expiresAt: cartData.expiresAt,
        isExpired: cartData.isExpired,
      });
    }
  }, [actions]);

  return <div className={cn(className)}>{children}</div>;
}
