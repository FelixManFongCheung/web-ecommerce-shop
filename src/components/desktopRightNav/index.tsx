import { DecoratorLines } from "@/components";
import { cn } from "@/lib/cn/utils";

export const VERTICAL_LINE_HEIGHT = 50;
export const VERTICAL_LINE_OFFSET_X = 3;
export const VERTICAL_LINE_OFFSET_Y = 2;

export const HORIZONTAL_LINE_WIDTH = 40;
export const HORIZONTAL_LINE_OFFSET_X = 1.5;
export const HORIZONTAL_LINE_OFFSET_Y = 8;

export default function DesktopRightNav() {
  return (
    <div
      className={`md:block hidden fixed z-11 right-0 top-0 h-full w-desktop-right-nav-width bg-white`}
    >
      {/* vertical line */}
      <DecoratorLines
        alignment="vertical"
        variant="thick"
        position="right"
        strokeColor="var(--color-primary)"
        height={`${VERTICAL_LINE_HEIGHT}rem`}
        x={VERTICAL_LINE_OFFSET_X}
        y={VERTICAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        variant="thin"
        position="right"
        strokeColor="var(--color-primary)"
        width={`${HORIZONTAL_LINE_WIDTH}rem`}
        x={HORIZONTAL_LINE_OFFSET_X}
        y={HORIZONTAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
    </div>
  );
}
