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
    ? "Sold Out"
    : cartProductIds.includes(productId)
    ? "Added to cart"
    : "Add to cart";
  const { addProduct } = useCartActions();

  const { openCart } = useAppActions();

  const addToCartAction = async () => {
    addProduct(productId);
    openCart();
  };

  return (
    <button
      disabled={ATCState !== "Add to cart"}
      className={cn(
        "fixed bottom-0 left-0 h-header-height-mobile w-full block z-12 cart-open:z-10 bg-primary text-secondary",
        "md:md:relative md:h-auto md:w-full md:z-0 py-2 px-4",
        ATCState !== "Add to cart" &&
          "border border-primary text-primary bg-secondary"
      )}
      onClick={addToCartAction}
    >
      <p>{ATCState}</p>
    </button>
  );
}
