"use client";
import { cn } from "@/lib/cn/utils";
import { useAppActions, useIsOpen } from "@/stores/appStore";

export function MenuBtn() {
  const { toggleOpen } = useAppActions();
  const isOpen = useIsOpen();
  return (
    <>
      <button onClick={toggleOpen}>MENU</button>
      <div
        onClick={toggleOpen}
        className={cn("fixed inset-0 z-12", isOpen ? "block" : "hidden")}
      ></div>
    </>
  );
}
