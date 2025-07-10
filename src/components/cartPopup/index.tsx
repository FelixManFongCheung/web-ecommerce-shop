"use client";

import { useAppActions, useIsCartOpen } from "@/stores";
import { getCartProductsClient } from "@/utils/getCart/client";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function CartPopup() {
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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={toggleCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6">
        <div className="flex justify-between items-center">
          <h2>Your Cart</h2>
          <button onClick={toggleCart}>×</button>
        </div>
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
