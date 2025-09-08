"use client";

import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { useCartProducts } from "@/stores/cartStore";
import { useEffect, useState } from "react";
export default function CartBtn({ className }: { className?: string }) {
  const [cartCount, setCartCount] = useState(0);
  const { openCart } = useAppActions();
  const cartProducts = useCartProducts();
  useEffect(() => {
    setCartCount(cartProducts.length);
  }, [cartProducts]);

  return (
    <div onClick={openCart} className={cn("cursor-pointer", className)}>
      <h1 className={cn("text-inherit text-wrap text-7xl")}>
        Cart({cartCount || 0})
      </h1>
    </div>
  );
}
