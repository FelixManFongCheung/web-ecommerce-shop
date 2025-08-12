"use client";

import { addToCart } from "@/actions/cart";
import { cn } from "@/lib/utils";
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
      className={cn("block", ATCState && "opacity-50 cursor-not-allowed")}
      onClick={addToCartAction}
    >
      Add to cart
    </button>
  );
}
