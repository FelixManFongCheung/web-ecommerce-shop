"use client";

import { Filter } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useAppActions, useIsOpen } from "@/stores/appStore";
import Link from "next/link";
import { Group } from "../desktopLeftNav/components/filter";
import { menuConfig } from "./menuConfig";

export default function Menu({
  style,
  groups,
}: {
  style?: React.CSSProperties;
  groups: Group;
}) {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();
  return (
    <div
      className={cn(
        "w-screen bg-primary text-secondary fixed z-12 py-4 block transition-all duration-300 ease-in-out",
        isOpen ? "h-52 opacity-100" : "h-0 opacity-0 pointer-events-none"
      )}
      style={style}
    >
      <div className="relative w-full grid grid-cols-1 md:grid-cols-4">
        {/* format */}
        <div className="flex flex-col">
          {menuConfig.shops.map((item) => (
            <Link
              onClick={() => toggleOpen()}
              key={`menu-${item.label}`}
              href={item.href}
              className={cn("hover:underline")}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {/* panel */}
        <div className="flex flex-col">
          <Filter
            groups={groups}
            menuStyle={{
              paddingTop: "0",
            }}
          />
        </div>
        {/* info */}
        <div className="flex flex-col">
          {menuConfig.info.map((item) => (
            <Link
              onClick={() => toggleOpen()}
              key={`menu-${item.label}`}
              href={item.href}
              className={cn("hover:underline")}
            >
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
