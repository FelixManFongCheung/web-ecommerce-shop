"use client";

import { cn } from "@/lib/cn/utils";
import { useIsOpen } from "@/stores/appStore";
import Link from "next/link";
import { menuConfig } from "./menuConfig";

export default function Menu({ style }: { style?: React.CSSProperties }) {
  const isOpen = useIsOpen();
  return (
    <div
      className={cn(
        "w-screen h-96 bg-primary text-secondary fixed z-12 py-4",
        isOpen ? "block" : "hidden"
      )}
      style={style}
    >
      <div className="relative w-full grid grid-cols-1 md:grid-cols-4">
        {/* format */}
        <div className="flex flex-col gap-2">
          {menuConfig.shops.map((item) => (
            <Link key={`menu-${item.label}`} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        {/* panel */}
        <div className="flex flex-col gap-2">
          <div></div>
        </div>
        {/* info */}
        <div className="flex flex-col gap-2">
          {menuConfig.info.map((item) => (
            <Link key={`menu-${item.label}`} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        {/* empty column for spacing */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
}
