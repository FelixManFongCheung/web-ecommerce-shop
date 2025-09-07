"use client";

import { addProductToCartClient } from "@/lib/cart/client";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { useState } from "react";

interface ATCProp {
  productId: string;
  isATC: boolean;
}

export default function ATC({ productId, isATC }: ATCProp) {
  const [ATCState, setATCState] = useState(isATC);

  const { openCart } = useAppActions();

  const addToCartAction = async () => {
    setATCState(true);
    addProductToCartClient(productId);
    openCart();
  };

  return (
    <button
      disabled={ATCState}
      className={cn(
        "fixed bottom-0 left-0 h-header-height-mobile w-full block z-10 bg-primary text-secondary",
        "md:md:relative md:h-auto md:w-full md:z-0",
        ATCState && "border border-primary text-primary bg-secondary"
      )}
      onClick={addToCartAction}
    >
      {ATCState ? <p> Sold Out</p> : <p>Add to cart</p>}
    </button>
  );
}
