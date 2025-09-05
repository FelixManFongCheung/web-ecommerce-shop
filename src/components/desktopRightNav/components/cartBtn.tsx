"use client";

import { cn } from "@/lib/cn/utils";
import { useAppActions } from "@/stores/appStore";

export default function CartBtn({ className }: { className?: string }) {
  const { openCart } = useAppActions();
  return (
    <div onClick={openCart} className={cn("cursor-pointer", className)}>
      <h1 className={cn("text-inherit text-wrap text-7xl")}>Cart</h1>
    </div>
  );
}
