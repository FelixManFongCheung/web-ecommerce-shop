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
        "w-screen h-fit bg-primary text-secondary grid-col-1 md:grid-cols-4 fixed z-12",
        isOpen ? "block" : "hidden"
      )}
      style={style}
    >
      {/* format */}
      <div className="flex flex-col gap-2">
        <div></div>
        <div></div>
        <div></div>
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
    </div>
  );
}
