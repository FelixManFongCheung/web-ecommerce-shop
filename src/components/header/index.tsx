"use client";

import { Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useAppActions, useIsCartOpen } from "@/stores/appStore";
import Image from "next/image";

export default function Header() {
  const { toggleOpen, toggleCart } = useAppActions();
  const isCartOpen = useIsCartOpen();

  return (
    <>
      {/* header z index 11 */}
      <div
        className={cn(
          "fixed top-0 md:h-header-height h-header-height-mobile flex z-12 md:z-11 w-full justify-between px-5",
          "bg-white cart-open:bg-primary",
          "cart-open:z-20"
        )}
      >
        <div className="block md:hidden">
          <button className="h-full cursor-pointer" onClick={toggleOpen}>
            {isCartOpen ? (
              <Image
                src="/assets/white/menu.png"
                alt="menu"
                width={27}
                height={27}
              />
            ) : (
              <Image
                src="/assets/normal/menu.png"
                alt="menu"
                width={27}
                height={27}
              />
            )}
          </button>
        </div>

        <Icon
          className={cn(
            "absolute top-0 left-1/2 h-full transform -translate-x-1/2",
            isCartOpen ? "text-secondary md:text-primary" : "text-primary",
            "transition-all duration-300 ease-in-out",
            "hover:text-primary/70"
          )}
          fontSize={20}
        />
        <button
          className="md:hidden h-header-height-mobile fixed top-0 right-5 flex justify-center items-center cursor-pointer"
          onClick={toggleCart}
        >
          {isCartOpen ? (
            <Image
              src="/assets/white/cart.png"
              alt="cart"
              width={27}
              height={27}
            />
          ) : (
            <Image
              src="/assets/normal/cart.png"
              alt="cart"
              width={27}
              height={27}
            />
          )}
        </button>
      </div>
    </>
  );
}
