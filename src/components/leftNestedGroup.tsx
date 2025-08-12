"use client";

import { type Group } from "@/components/desktopLeftNav";
import { useState } from "react";

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
    <div key={key} style={{ marginLeft: `${level * 1}rem` }}>
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
            openItems.has(key) ? "h-auto" : "h-0"
          } overflow-hidden transition-all duration-300`}
        >
          <LeftNestedGroup group={value as Group} level={level + 1} />
        </div>
      )}
    </div>
  ));
}
