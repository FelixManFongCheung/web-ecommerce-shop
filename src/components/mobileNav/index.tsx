"use client";

import { useAppActions, useIsOpen } from "@/stores";
import clsx from "clsx";
import TabsWrapper from "../tabs";

export default function MobileNav() {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();

  return (
    <div
      className={clsx(
        "block opacity-0 fixed top-0 left-0 w-full h-screen overflow-hidden transition-opacity duration-500 ease-in-out z-20 pointer-events-none",
        isOpen && "opacity-100 pointer-events-auto"
      )}
    >
      <div
        className={clsx(
          "fixed top-0 left-0 w-full h-screen transition-colors duration-500 ease-in-out",
          isOpen ? "bg-black/70" : "bg-black/0"
        )}
        onClick={toggleOpen}
      ></div>
      <div
        className={clsx(
          "fixed bg-white p-12 pr-4 w-3/5 h-screen flex flex-col gap-5 transition-all duration-500 ease-in-out",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        <TabsWrapper isMobile={true} />
      </div>
    </div>
  );
}
