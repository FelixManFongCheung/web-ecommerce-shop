"use client";

import { getCartFromCookieClient } from "@/lib/cart/client";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { useEffect, useState } from "react";

export default function CartBtn({ className }: { className?: string }) {
  const [cartCount, setCartCount] = useState(0);
  const { openCart } = useAppActions();
  useEffect(() => {
    setCartCount(getCartFromCookieClient().length);
  }, []);

  return (
    <div onClick={openCart} className={cn("cursor-pointer", className)}>
      <h1 className={cn("text-inherit text-wrap text-7xl")}>
        Cart({cartCount || 0})
      </h1>
    </div>
  );
}
