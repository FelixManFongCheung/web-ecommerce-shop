"use client";

import { getCartFromCookieClient } from "@/lib/cart/client";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";

export default function CartBtn({ className }: { className?: string }) {
  const { openCart } = useAppActions();
  const cartCount = getCartFromCookieClient()?.products.length;

  return (
    <div onClick={openCart} className={cn("cursor-pointer", className)}>
      <h1 className={cn("text-inherit text-wrap text-7xl")}>
        Cart({cartCount})
      </h1>
    </div>
  );
}
