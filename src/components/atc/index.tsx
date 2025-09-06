"use client";

import { addToCart } from "@/actions/cart";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { v7 as uuidv7 } from "uuid";

interface ATCProp {
  productId: string;
  isATC: boolean;
}

export default function ATC({ productId, isATC }: ATCProp) {
  const [ATCState, setATCState] = useState(isATC);
  const cartCookies = getCookie("cart");

  const { openCart } = useAppActions();

  const addToCartAction = async () => {
    let identifier: string;
    setATCState(true);
    if (cartCookies) {
      identifier = cartCookies as string;
    } else {
      identifier = uuidv7();
    }

    await addToCart(identifier, productId);

    openCart();
  };
  return (
    <button
      disabled={ATCState}
      className={cn(
        "md:relative fixed bottom-0 left-0 h-header-height-mobile md:h-auto w-full block md:w-full bg-primary text-secondary",
        ATCState && "border border-primary text-primary bg-secondary"
      )}
      onClick={addToCartAction}
    >
      {ATCState ? <p> Sold Out</p> : <p>Add to cart</p>}
    </button>
  );
}
