"use client";

import { DecoratorLines } from "@/components";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_WIDTH_LEFT,
} from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import { Group } from ".";

export function NestedGroup({
  group,
  level = 0,
  path = "",
  onClickHandle,
  menuStyle,
}: {
  group: Group;
  level?: number;
  path?: string;
  onClickHandle?: () => void;
  menuStyle?: React.CSSProperties;
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

  return Object.entries(group).map(([key, value]) => {
    if (metaDataKey.indexOf(key) !== 0 && menuStyle) return null;

    return (
      <div
        key={key}
        className={cn(
          `text-[0.7rem] ${
            level === 0 && metaDataKey.indexOf(key) === 0 && "h-fit pt-[0.7rem]"
          }`
        )}
        style={
          level === 0 && metaDataKey.indexOf(key) === 0 && menuStyle
            ? menuStyle
            : {}
        }
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
            <button
              className={cn(
                "inline-block relative w-2 h-2 mr-1",
                //vertical line
                "before:content-[''] before:bg-black before:block before:w-[1px] before:h-2 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-300 before:ease-in-out",
                //horizontal line
                "after:content-[''] after:bg-black after:block after:h-[1px] after:w-2 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-in-out",
                openItems.has(key)
                  ? "after:rotate-90 after:opacity-0 before:rotate-90"
                  : "after:rotate-0 after:opacity-100 before:rotate-0"
              )}
              onClick={() => handleClick(key)}
            />
          ) : null}
          <Link
            href={
              key === "all items"
                ? "/collections/all"
                : `/collections/${path}-${key}`
            }
            className={cn(
              level === 0 && "pointer-events-none",
              "inline-block",
              "hover:underline"
            )}
            onClick={onClickHandle}
          >
            <h1 style={{ cursor: "pointer" }}>
              <span>{level === 0 ? key.toUpperCase() : key}</span>
            </h1>
          </Link>
          {value && Object.keys(value).length > 0 && (
            <div
              className={cn(
                `${
                  openItems.has(key) ? "max-h-64" : "max-h-0"
                } overflow-hidden transition-all duration-300 ease-in-out`,
                level === 1 && "max-h-64 overflow-y-auto"
              )}
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
    );
  });
}
