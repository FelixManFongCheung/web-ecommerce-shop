import { DecoratorLines } from "@/components";
import { cn } from "@/lib/cn/utils";
import Filter from "./components/filter";

export const VERTICAL_LINE_HEIGHT = 40;
export const VERTICAL_LINE_OFFSET_X = 3;
export const VERTICAL_LINE_OFFSET_Y = 2;

export const HORIZONTAL_LINE_WIDTH = 25;
export const HORIZONTAL_LINE_OFFSET_X = 1.5;
export const HORIZONTAL_LINE_OFFSET_Y = 8;

export interface Group {
  [key: string]: object | Group;
}

export default async function DesktopLeftNav() {
  return (
    <div
      className={`md:block hidden fixed z-11 left-0 top-0 h-full w-desktop-left-nav-width bg-transparent`}
    >
      {/* TODO: to be abstracted */}
      {/* Navigation */}
      <div
        className={cn("absolute flex flex-row justify-end items-center gap-2")}
        style={{
          top: `${VERTICAL_LINE_OFFSET_Y}rem`,
          left: `${VERTICAL_LINE_OFFSET_X * 2}rem`,
          height: `${HORIZONTAL_LINE_OFFSET_Y - VERTICAL_LINE_OFFSET_Y}rem`,
        }}
      >
        <h1 className="text-primary text-wrap text-7xl">Shop</h1>
        <span>|</span>
        <div className="">MENU</div>
      </div>
      {/* Filters */}
      <Filter />
      {/* vertical line */}
      <DecoratorLines
        alignment="vertical"
        position="left"
        variant="thin"
        strokeColor="var(--color-primary)"
        height={`${VERTICAL_LINE_HEIGHT}rem`}
        x={VERTICAL_LINE_OFFSET_X}
        y={VERTICAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        position="left"
        variant="thick"
        strokeColor="var(--color-primary)"
        width={`${HORIZONTAL_LINE_WIDTH}rem`}
        x={HORIZONTAL_LINE_OFFSET_X}
        y={HORIZONTAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
    </div>
  );
}
