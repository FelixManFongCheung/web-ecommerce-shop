"use client";

import { cn } from "@/lib/utils";
import { useAppActions } from "@/stores";
import { Menu } from "lucide-react";
import Link from "next/link";
import { CartPopup } from "../cartPopup";
import TabsWrapper from "../tabs";

export default function Header() {
  const { toggleOpen } = useAppActions();
  return (
    <>
      <div className="fixed top-0 h-[10vh] bg-white flex z-10 w-full justify-between px-5">
        <div className="block md:hidden">
          <button className="h-full" onClick={toggleOpen}>
            <Menu />
          </button>
        </div>

        <TabsWrapper className={cn("hidden md:flex")}>
          <div className="relative flex items-center">
            <Link href="/">
              <strong className="text-lg after:content-['*'] after:text-xs after:relative after:-top-1">
                proxy archive
              </strong>
            </Link>
          </div>
        </TabsWrapper>
      </div>
      <CartPopup />
    </>
  );
}
