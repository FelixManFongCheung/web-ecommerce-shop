"use client";

import { CartPopup, Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import Image from "next/image";

export default function Header() {
  const { toggleOpen } = useAppActions();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 md:h-header-height h-header-height-mobile flex z-10 w-full justify-between px-5"
        )}
      >
        <div className="block md:hidden">
          <button className="h-full cursor-pointer" onClick={toggleOpen}>
            <Image
              src="/assets/normal/menu.png"
              alt="menu"
              width={24}
              height={24}
            />
          </button>
        </div>

        <Icon
          className={cn(
            "absolute top-0 left-1/2 h-full transform -translate-x-1/2 flex items-center justify-center"
          )}
        />
        <CartPopup />
      </div>
    </>
  );
}
