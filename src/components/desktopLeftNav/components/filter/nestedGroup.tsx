"use client";

import { DecoratorLines } from "@/components";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_WIDTH_LEFT,
} from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Group } from ".";

export function NestedGroup({
  group,
  level = 0,
  path = "",
  onClickHandle,
}: {
  group: Group;
  level?: number;
  path?: string;
  onClickHandle?: () => void;
}) {
  if (group["categories"]) {
    group.categories = {
      "all items": {},
      ...group.categories,
    };
  }
  const initialOpenItems =
    level === 0 ? new Set(Object.keys(group)) : new Set([]);
  const [openItems, setOpenItems] = useState<Set<string>>(initialOpenItems);

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
      className={cn(
        `text-[0.7rem] ${
          level === 0 && metaDataKey.indexOf(key) === 0 && "h-64"
        }`,
        level === 0 && "pt-[0.7rem]"
      )}
    >
      {level === 0 && metaDataKey.indexOf(key) !== 0 && (
        <DecoratorLines
          alignment="horizontal"
          position="left"
          variant="medium"
          width={`${HORIZONTAL_LINE_WIDTH_LEFT / 2}rem`}
          left={-3.5 + HORIZONTAL_LINE_OFFSET_X_LEFT}
          className={cn("relative bg-primary hidden md:block mb-[0.7rem]")}
        />
      )}
      <div style={{ marginLeft: `${level * 0.2}rem` }}>
        {Object.keys(value).length > 0 && level > 0 ? (
          openItems.has(key) ? (
            <button className="inline-block" onClick={() => handleClick(key)}>
              <Minus className="w-2 h-2" />
            </button>
          ) : (
            <button className="inline-block" onClick={() => handleClick(key)}>
              <Plus className="w-2 h-2" />
            </button>
          )
        ) : null}
        <Link
          href={
            key === "all items"
              ? "/collections/all"
              : `/collections/${path}-${key}`
          }
          className={cn(level === 0 && "pointer-events-none", "inline-block")}
          onClick={onClickHandle}
        >
          <h1 style={{ cursor: "pointer" }}>
            <span>{key}</span>
          </h1>
        </Link>
        {value && Object.keys(value).length > 0 && (
          <div
            className={`${
              openItems.has(key) ? "max-h-64" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <NestedGroup
              group={value as Group}
              level={level + 1}
              path={level === 0 ? key : `${path}-${key}`}
              onClickHandle={onClickHandle}
            />
          </div>
        )}
      </div>
    </div>
  ));
}
