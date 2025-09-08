"use client";

import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { useCartActions } from "@/stores/cartStore";
import { useState } from "react";

interface ATCProp {
  productId: string;
  isATC: boolean;
}

// TODO: there is no need to revalidate product page because atc is a client component just use the zustand state instead
export default function ATC({ productId, isATC }: ATCProp) {
  const [ATCState, setATCState] = useState(isATC);
  const { addProduct } = useCartActions();

  const { openCart } = useAppActions();

  const addToCartAction = async () => {
    setATCState(true);
    addProduct(productId);
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
