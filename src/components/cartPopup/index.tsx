"use client";

import { getCartProductsClient } from "@/actions/getCart/client";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_RIGHT,
  HORIZONTAL_LINE_WIDTH_RIGHT,
} from "@/lib/constants";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";

// Extract cart content as a separate component
function CartContent({
  cartProducts,
  isLoading,
}: {
  cartProducts: Stripe.Product[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cartProducts.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}

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
    <>
      {/* Mobile cart icon - only render on mobile */}
      <div className={cn("block md:hidden", className)}>
        <button className="h-full cursor-pointer" onClick={toggleCart}>
          <Image
            src="/assets/normal/cart.png"
            alt="cart"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Desktop cart sidebar - only render on desktop */}
      <div
        className={cn("relative h-screen hidden md:block", className)}
        data-cart-open={isCartOpen}
      >
        {isCartOpen && <div className="fixed inset-0" onClick={toggleCart} />}
        <div
          className={cn(
            "fixed top-0 h-full bg-primary p-6 transition-all duration-300 ease-in-out"
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
          <CartContent cartProducts={cartProducts} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

// Export the CartContent component for reuse
export { CartContent };
