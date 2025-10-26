"use client";

import { Filter, Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import { useEffect, useState } from "react";
import { Group } from "../filter";

export default function MobileFilter({
  headerName,
  groups,
}: {
  headerName: string;
  groups: Group;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleFilterOpen = () => {
    setIsFilterOpen(true);
    document.body.classList.add("filter-open");
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
    document.body.classList.remove("filter-open");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("filter-open");
    };
  }, []);
  return (
    <div className="relative z-30 block md:hidden">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-primary text-nowrap text-(length:--mobile-header-text-size)">
          {headerName}
        </h1>
        <div className="cursor-pointer" onClick={handleFilterOpen}>
          filters
        </div>
      </div>
      <div className="cursor-pointer" onClick={handleFilterOpen} />
      <div
        className={cn(
          "fixed inset-0 h-screen w-screen transition-all duration-300 ease-in-out",
          isFilterOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn("fixed inset-0 h-full w-full bg-primary/30")}
          onClick={handleFilterClose}
        />
        <div className="relative w-[57%] h-full bg-secondary mx-auto flex flex-col gap-header-height-mobile">
          <Icon className="text-primary h-header-height-mobile w-full pointer-events-none justify-center" />
          <Filter
            groups={groups}
            className="relative px-8"
            onClickHandle={handleFilterClose}
          />
          
        </div>
      </div>
    </div>
  );
}
