import { DecoratorLines, Menu } from "@/components";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_OFFSET_Y_LEFT,
  HORIZONTAL_LINE_WIDTH_LEFT,
  VERTICAL_LINE_HEIGHT_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
  VERTICAL_LINE_OFFSET_Y_LEFT,
} from "@/lib/constants";
import { MenuBtn } from "./components/menuBtn";

export default async function DesktopLeftNav({
  headerName,
  children,
}: {
  headerName: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`md:block hidden fixed z-12 left-0 top-0 h-full w-desktop-left-nav-width bg-transparent`}
    >
      {/* TODO: to be abstracted */}
      {/* Navigation */}
      <div
        className={cn("absolute flex flex-row justify-end items-center gap-2")}
        style={{
          top: `${VERTICAL_LINE_OFFSET_Y_LEFT}rem`,
          left: `${VERTICAL_LINE_OFFSET_X_LEFT * 2}rem`,
          height: `${
            HORIZONTAL_LINE_OFFSET_Y_LEFT - VERTICAL_LINE_OFFSET_Y_LEFT
          }rem`,
        }}
      >
        <h1 className="text-primary text-nowrap text-7xl">{headerName}</h1>
        <span>|</span>
        <MenuBtn />
      </div>
      {/* Desktop Left Nav displaying content for each page */}
      {children}
      {/* vertical line */}
      <DecoratorLines
        alignment="vertical"
        position="left"
        variant="thin"
        strokeColor="var(--color-primary)"
        height={`${VERTICAL_LINE_HEIGHT_LEFT}rem`}
        x={VERTICAL_LINE_OFFSET_X_LEFT}
        y={VERTICAL_LINE_OFFSET_Y_LEFT}
        className={cn("absolute")}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        position="left"
        variant="thick"
        strokeColor="var(--color-primary)"
        width={`${HORIZONTAL_LINE_WIDTH_LEFT}rem`}
        x={HORIZONTAL_LINE_OFFSET_X_LEFT}
        y={HORIZONTAL_LINE_OFFSET_Y_LEFT}
        className={cn("absolute")}
      />
      <Menu
        style={{
          top: `${HORIZONTAL_LINE_OFFSET_Y_LEFT + 2}rem`,
          paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT}rem`,
          paddingRight: `${VERTICAL_LINE_OFFSET_X_LEFT}rem`,
        }}
      />
    </div>
  );
}
