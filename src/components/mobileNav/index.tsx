"use client";

import { TabsWrapper } from "@/components";
import { cn } from "@/lib/utils";
import { useAppActions, useIsOpen } from "@/stores";

export default function MobileNav() {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();

  return (
    <div
      className={cn(
        "block opacity-0 fixed top-0 left-0 w-full h-screen overflow-hidden transition-opacity duration-500 ease-in-out z-20 pointer-events-none",
        isOpen && "opacity-100 pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-screen transition-colors duration-500 ease-in-out",
          isOpen ? "bg-black/70" : "bg-black/0"
        )}
        onClick={toggleOpen}
      ></div>
      <div
        className={cn(
          "fixed bg-white mx-auto left-[50%] translate-x-[-50%] px-4 w-1/2 h-screen flex flex-col gap-5 transition-all duration-500 ease-in-out",
          isOpen ? "block" : "hidden pointer-events-none"
        )}
      >
        <TabsWrapper isMobile={true} />
      </div>
    </div>
  );
}
