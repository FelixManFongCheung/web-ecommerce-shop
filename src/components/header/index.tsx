"use client";

import { CartPopup, Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";
import { Menu } from "lucide-react";

export default function Header() {
  const { toggleOpen } = useAppActions();

  return (
    <>
      <div className="fixed top-0 h-header-height bg-white flex z-10 w-full justify-between px-5">
        <div className="block md:hidden">
          <button className="h-full" onClick={toggleOpen}>
            <Menu />
          </button>
        </div>

        <Icon
          className={cn(
            "absolute top-0 left-1/2 h-full transform -translate-x-1/2 flex items-center justify-center"
          )}
        />
      </div>
      <CartPopup className="md:hidden" />
    </>
  );
}
