"use client";

import { DecoratorLines } from "@/components";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_WIDTH_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
} from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Group } from ".";

export function NestedGroup({
  group,
  level = 0,
}: {
  group: Group;
  level?: number;
}) {
  const initialOpenItems =
    level === 0 ? new Set(Object.keys(group)) : new Set([]);
  const [openItems, setOpenItems] = useState<Set<string>>(initialOpenItems);

  console.log(openItems);

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
    <div
      key={key}
      className={`${level === 0 && metaDataKey.indexOf(key) === 0 && "h-64"}`}
    >
      {level === 0 && metaDataKey.indexOf(key) !== 0 && (
        <DecoratorLines
          alignment="horizontal"
          position="left"
          variant="medium"
          width={`${HORIZONTAL_LINE_WIDTH_LEFT / 2}rem`}
          x={-(VERTICAL_LINE_OFFSET_X_LEFT * 2 - HORIZONTAL_LINE_OFFSET_X_LEFT)}
          className={cn("relative bg-primary")}
        />
      )}
      <div style={{ marginLeft: `${level * 0.2}rem` }}>
        <h1 onClick={() => handleClick(key)} style={{ cursor: "pointer" }}>
          {Object.keys(value).length > 0 && level > 0 ? (
            openItems.has(key) ? (
              <Minus className="w-2 h-2 inline-block" />
            ) : (
              <Plus className="w-2 h-2 inline-block" />
            )
          ) : null}

          <span className="inline-block">{key}</span>
        </h1>
        {value && Object.keys(value).length > 0 && (
          <div
            className={`${
              openItems.has(key) ? "max-h-64" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <NestedGroup group={value as Group} level={level + 1} />
          </div>
        )}
      </div>
    </div>
  ));
}
