"use client";

import { Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useAppActions, useIsOpen } from "@/stores/appStore";

export default function Nav() {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();

  return (
    <>
      <div
        className={cn(
          "block opacity-0 fixed inset-0 w-full h-screen overflow-hidden transition-opacity duration-500 ease-in-out z-20 pointer-events-none",
          isOpen && "opacity-100 pointer-events-auto",
          "md:hidden"
        )}
      >
        <div
          className={cn(
            "fixed inset-0 w-full h-screen transition-colors duration-500 ease-in-out",
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
          <Icon className={cn("h-header-height mx-auto justify-center")} />
        </div>
      </div>
      <div className="h-[10vh] w-full hidden"></div>
    </>
  );
}
