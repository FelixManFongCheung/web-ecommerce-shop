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
        "w-screen bg-primary text-secondary fixed z-12 py-4 block transition-all duration-300 ease-in-out",
        isOpen ? "h-96 opacity-100" : "h-0 opacity-0"
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
