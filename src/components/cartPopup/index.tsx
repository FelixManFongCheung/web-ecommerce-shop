"use client";

import { getCartProductsClient } from "@/actions/getCart/client";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_RIGHT,
  HORIZONTAL_LINE_WIDTH_RIGHT,
} from "@/lib/constants";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function CartPopup({ className }: { className?: string }) {
  const isCartOpen = useIsCartOpen();
  const { toggleCart } = useAppActions();
  const cartCookies = getCookie("cart");
  const [cartProducts, setCartProducts] = useState<Stripe.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const showCartProducts = async () => {
      setIsLoading(true);
      try {
        if (cartCookies) {
          const cartProducts = await getCartProductsClient(
            cartCookies as string
          );
          setCartProducts(cartProducts);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isCartOpen) {
      showCartProducts();
    }
  }, [cartCookies, isCartOpen]);

  return (
    <div className={cn("fixed inset-0", className)} data-cart-open={isCartOpen}>
      <div className="absolute inset-0" onClick={toggleCart} />
      <div
        className={cn(
          "absolute top-0 h-full bg-primary p-6 transition-all duration-300 ease-in-out"
        )}
        style={{
          width: `${
            HORIZONTAL_LINE_WIDTH_RIGHT + HORIZONTAL_LINE_OFFSET_X_RIGHT + 1.5
          }rem`,
          right: isCartOpen
            ? "0"
            : `-${
                HORIZONTAL_LINE_WIDTH_RIGHT +
                HORIZONTAL_LINE_OFFSET_X_RIGHT +
                1.5
              }rem`,
        }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          cartProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))
        )}
      </div>
    </div>
  );
}
