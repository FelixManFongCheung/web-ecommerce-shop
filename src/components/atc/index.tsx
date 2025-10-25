"use client";

import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { useCartActions, useCartProducts } from "@/stores/cartStore";

interface ATCProp {
  productId: string;
  isSoldOut: boolean;
}

export default function ATC({ productId, isSoldOut }: ATCProp) {
  const cartProducts = useCartProducts();
  const cartProductIds = cartProducts || [];

  const ATCState = isSoldOut
    ? "SOLD OUT"
    : cartProductIds.includes(productId)
    ? "IN CART"
    : "ADD TO CART";
  const { addProduct } = useCartActions();

  const { openCart } = useAppActions();

  const addToCartAction = async () => {
    addProduct(productId);
    openCart();
  };

  return (
    <button
      disabled={ATCState !== "ADD TO CART"}
      className={cn(
        "fixed bottom-0 left-0 h-header-height-mobile w-full block z-12 cart-open:z-10 bg-primary text-secondary",
        "md:md:relative md:h-auto md:w-full md:z-0 py-2 px-4",
        ATCState !== "ADD TO CART" &&
          "border border-primary text-primary bg-secondary",
        ATCState === "IN CART" && "italic"
      )}
      onClick={addToCartAction}
    >
      <p>{ATCState}</p>
    </button>
  );
}
