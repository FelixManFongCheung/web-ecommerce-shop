"use client";

import { CartPopup, Icon, TabsWrapper } from "@/components";
import { cn } from "@/lib/utils";
import { useAppActions } from "@/stores";
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

        <TabsWrapper className={cn("hidden md:flex")}>
          <Icon />
        </TabsWrapper>
      </div>
      <div className="h-[10vh] w-full hidden"></div>
      <CartPopup />
    </>
  );
}
