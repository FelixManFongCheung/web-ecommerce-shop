"use client";

import { DecoratorLines } from "@/components";
import {
  VERTICAL_LINE_OFFSET_X,
  type Group,
} from "@/components/desktopLeftNav";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";
import { useState } from "react";
import {
  HORIZONTAL_LINE_OFFSET_X,
  HORIZONTAL_LINE_WIDTH,
} from "./desktopLeftNav";

export default function LeftNestedGroup({
  group,
  level = 0,
}: {
  group: Group;
  level?: number;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleClick = (key: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return Object.entries(group).map(([key, value]) => (
    <div key={key}>
      {level === 0 && metaDataKey.indexOf(key) !== 0 && (
        <DecoratorLines
          alignment="horizontal"
          position="left"
          variant="thick"
          strokeColor="var(--color-primary)"
          width={`${HORIZONTAL_LINE_WIDTH}rem`}
          x={-(VERTICAL_LINE_OFFSET_X * 2 - HORIZONTAL_LINE_OFFSET_X)}
          className={cn("relative")}
        />
      )}
      <div style={{ marginLeft: `${level * 1}rem` }}>
        <h1
          className={level === 0 ? "text-lg font-bold" : "text-sm font-medium"}
          onClick={() => handleClick(key)}
          style={{ cursor: "pointer" }}
        >
          {key}
        </h1>
        {value && (
          <div
            className={`${
              openItems.has(key) ? "max-h-96" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <LeftNestedGroup group={value as Group} level={level + 1} />
          </div>
        )}
      </div>
    </div>
  ));
}
