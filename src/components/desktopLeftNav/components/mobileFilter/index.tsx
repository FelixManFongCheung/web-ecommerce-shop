"use client";

import { Filter, Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useState } from "react";
import { Group } from "../filter";

export default function MobileFilter({
  headerName,
  groups,
}: {
  headerName: string;
  groups: Group;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="relative z-30 block md:hidden">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-primary text-nowrap text-7xl">{headerName}</h1>
        <div className="cursor-pointer" onClick={() => setIsFilterOpen(true)}>
          filters
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setIsFilterOpen(true)} />
      <div
        className={cn(
          "fixed inset-0 h-screen w-screen",
          isFilterOpen ? "block" : "hidden"
        )}
      >
        <div
          className={cn("fixed inset-0 h-full w-full bg-primary/30")}
          onClick={() => setIsFilterOpen(false)}
        />
        <div className="relative w-[40%] h-full bg-secondary mx-auto flex flex-col gap-header-height-mobile">
          <Icon className="text-primary h-header-height-mobile w-full pointer-events-none justify-center" />
          <Filter groups={groups} className="relative px-8" />
        </div>
      </div>
    </div>
  );
}
