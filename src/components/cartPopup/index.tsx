"use client";

import { getCartProductsClient } from "@/actions/getCart/client";
import { getPriceId, retrievePrice } from "@/actions/stripe";
import { cn } from "@/lib/cn/utils";
import { HORIZONTAL_LINE_OFFSET_Y_RIGHT } from "@/lib/constants";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import { useCartProducts } from "@/stores/cartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import CheckoutButton from "../checkout/checkoutButton";
import RemoveItem from "../removeItem";

// Extract cart content as a separate component
function CartContent({
  cartProducts,
  isLoading,
  className,
  isMobile = false,
}: {
  cartProducts: Stripe.Product[];
  isLoading: boolean;
  className?: string;
  isMobile?: boolean;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const isEmpty = cartProducts.length === 0;
  useEffect(() => {
    const getTotalPrice = async () => {
      let totalPrice = 0;
      for (const product of cartProducts) {
        const priceId = await getPriceId(product.id);
        const price = await retrievePrice(priceId);
        totalPrice += price.amount ?? 0;
        setCurrency(price.currency);
      }
      setTotalPrice(totalPrice);
    };
    getTotalPrice();
  }, [cartProducts]);

  return (
    <div
      className={cn("h-full flex flex-col", className)}
      style={{
        ...(!isMobile && {
          marginTop: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem`,
          height: `calc(100% - ${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem)`,
        }),
      }}
    >
      {isLoading ? (
        <div
          className="flex flex-col flex-1 gap-2 w-full text-secondary"
          {...(!isMobile && {
            style: {
              marginTop: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT}rem`,
            },
          })}
        ></div>
      ) : (
        <div
          className="flex flex-col flex-1 gap-5 w-full text-secondary overflow-y-auto no-scrollbar"
          {...(!isMobile && {
            style: {
              paddingRight: "0.4rem",
            },
          })}
        >
          {cartProducts.map((product) => (
            <div key={product.id} className="flex flex-row w-full">
              <div
                className={cn(
                  "relative flex flex-col gap-2 text-secondary w-[50%] aspect-[3/4]"
                )}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
                {product.name}
              </div>
              <div
                className={cn(
                  "relative flex flex-col gap-2 text-secondary flex-1 px-[0.5rem]"
                )}
              >
                <RemoveItem
                  productId={product.id}
                  className="flex flex-row gap-2 justify-between"
                >
                  <p>{product.name}</p>
                </RemoveItem>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-1 pb-4 md:p-0">
        {/* TODO: price in total */}
        <p className="text-secondary mb-4 md:mb-2 text-[0.7rem]">
          shipping and taxes calculated at checkout
        </p>
        <CheckoutButton
          totalPrice={totalPrice}
          currency={currency}
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
  const cartProductIds = useCartProducts();

  useEffect(() => {
    const showCartProducts = async () => {
      setIsLoading(true);
      const cartProducts = await getCartProductsClient(cartProductIds);
      setCartProducts(cartProducts);
      setIsLoading(false);
    };
    showCartProducts();
  }, [isCartOpen, cartProductIds]);

  // Manage body class for global styling
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("cart-open");
    };
  }, [isCartOpen]);

  return (
    <>
      {/* cartpopup z index 14 */}
      <div
        className={cn(
          "relative block md:hidden z-10 cart-open:z-19",
          className
        )}
      >
        <div
          className={cn(
            "fixed top-0 w-screen bg-primary p-2 pt-15 transition-all duration-300 ease-in-out",
            isCartOpen ? "right-0" : "-right-full",
            "h-screen flex flex-col"
          )}
        >
          <div className="relative mb-10 mr-3 after:right-0 after:bottom-3 after:absolute md:hidden block after:content-[''] after:block after:h-[3px] after:w-[75%] after:bg-secondary after:mt-[-0.8rem]">
            <h1 className="text-secondary text-nowrap text-(length:--desktop-header-text-size) text-right">
              Cart
            </h1>
          </div>
          <CartContent
            cartProducts={cartProducts}
            isLoading={isLoading}
            isMobile={true}
          />
        </div>
      </div>
      <div className={cn("fixed h-screen hidden md:block", className)}>
        {isCartOpen && <div className="fixed inset-0" onClick={toggleCart} />}
        <div
          className={cn(
            "fixed top-0 h-full bg-primary p-8 md:p-[1.5rem] md:pr-[3rem] transition-all duration-300 ease-in-out"
          )}
          style={{
            width: "26rem",
            right: isCartOpen ? "0" : "-26rem",
          }}
        >
          <CartContent cartProducts={cartProducts} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export { CartContent };
