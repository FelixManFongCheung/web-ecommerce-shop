"use client";

import { getCartProductsClient } from "@/actions/getCart/client";
import { getPriceId, retrievePrice } from "@/actions/stripe";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_RIGHT,
  HORIZONTAL_LINE_OFFSET_Y_RIGHT,
  HORIZONTAL_LINE_WIDTH_RIGHT,
} from "@/lib/constants";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import CheckoutButton from "../checkout/checkoutButton";

// Extract cart content as a separate component
function CartContent({
  cartProducts,
  isLoading,
}: {
  cartProducts: Stripe.Product[];
  isLoading: boolean;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const isEmpty = cartProducts.length === 0;
  useEffect(() => {
    const getTotalPrice = async () => {
      let totalPrice = 0;
      for (const product of cartProducts) {
        const priceId = await getPriceId(product.id);
        const price = await retrievePrice(priceId);
        totalPrice += price.unit_amount ?? 0;
      }
      setTotalPrice(totalPrice);
    };
    getTotalPrice();
  }, [cartProducts]);

  return (
    <div
      className="flex flex-col gap-2 h-full"
      style={{
        marginTop: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem`,
        height: `calc(98% - ${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem)`,
      }}
    >
      {isLoading ? (
        <div
          className="flex-1 w-full text-secondary"
          style={{
            marginTop: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem`,
          }}
        >
          Loading...
        </div>
      ) : (
        <div className="flex-1">
          {cartProducts.map((product) => (
            <div
              className={cn("flex flex-col gap-2 text-secondary")}
              key={product.id}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
      <div>
        {/* TODO: price in total */}
        <p className="text-secondary mb-4">
          shipping and taxes calculated at checkout
        </p>
        <CheckoutButton
          totalPrice={totalPrice}
          disabled={isLoading || isEmpty}
        />
      </div>
    </div>
  );
}

export default function CartPopup({ className }: { className?: string }) {
  const isCartOpen = useIsCartOpen();
  const { toggleCart } = useAppActions();
  const [cartProducts, setCartProducts] = useState<Stripe.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const showCartProducts = async () => {
      setIsLoading(true);
      try {
        const cartProducts = await getCartProductsClient();
        console.log(cartProducts);
        setCartProducts(cartProducts);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isCartOpen) {
      showCartProducts();
    }
  }, [isCartOpen]);

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
