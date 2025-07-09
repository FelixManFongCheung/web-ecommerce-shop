"use client";

import { useAppActions, useIsCartOpen } from "@/stores";
import { getCartProductsClient } from "@/utils/getCart/client";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import styles from "./cartPopup.module.scss";

export function CartPopup() {
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
    <div className={styles["cart-popup"]}>
      <div className={styles["cart-popup__overlay"]} onClick={toggleCart} />
      <div className={styles["cart-popup__content"]}>
        <div className={styles["cart-popup__header"]}>
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
