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
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return Object.entries(group).map(([key, value]) => (
    <div
      onClick={handleClick}
      key={key}
      className={`ml-${level * 4} ${level !== 0 && "h-0 overflow-hidden"} ${
        isOpen && "h-auto transition-all duration-300"
      }`}
    >
      <h1 className={level === 0 ? "text-lg font-bold" : "text-sm font-medium"}>
        {key}
      </h1>
      {value && LeftNestedGroup({ group: value as Group, level: level + 1 })}
    </div>
  ));
}
