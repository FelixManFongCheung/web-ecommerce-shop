import { DecoratorLines, Filter, Menu } from "@/components";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_OFFSET_Y_LEFT,
  HORIZONTAL_LINE_WIDTH_LEFT,
  VERTICAL_LINE_HEIGHT_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
  VERTICAL_LINE_OFFSET_Y_LEFT,
} from "@/lib/constants";
import { Group } from "../desktopLeftNav/components/filter";
import { MenuBtn } from "./components/menuBtn";
import MobileFilter from "./components/mobileFilter";

export default function DesktopLeftNav({
  headerName,
  children,
  hasFilter,
  isProductPage,
  groups,
}: {
  headerName: string;
  children?: React.ReactNode;
  hasFilter?: boolean;
  isProductPage?: boolean;
  groups: Group;
}) {
  return (
    <>
      <div
        className={`md:block hidden fixed z-11 cart-open:z-20 left-0 top-0 h-full w-desktop-left-nav-width bg-transparent`}
      >
        {/* Navigation */}
        <div
          className={cn(
            "absolute flex flex-row justify-end items-center gap-[3rem]"
          )}
          style={{
            top: `${VERTICAL_LINE_OFFSET_Y_LEFT}rem`,
            left: "3.3rem",
            height: `${
              HORIZONTAL_LINE_OFFSET_Y_LEFT - VERTICAL_LINE_OFFSET_Y_LEFT
            }rem`,
          }}
        >
          <h1
            className={cn(
              "text-primary text-nowrap text-(length:--desktop-header-text-size) max-w-[10rem] truncate"
            )}
          >
            {headerName}
          </h1>
          <MenuBtn />
        </div>
        {/* Desktop Left Nav displaying content for each page */}
        {children}
        {hasFilter && (
          <Filter
            groups={groups}
            style={{
              top: `${HORIZONTAL_LINE_OFFSET_Y_LEFT + 0.7}rem`,
              left: "3.5rem",
            }}
          />
        )}
        {/* vertical line */}
        <DecoratorLines
          alignment="vertical"
          position="left"
          variant="thin"
          height={`min(${VERTICAL_LINE_HEIGHT_LEFT}rem, calc(100vh - var(--footer-height)))`}
          left={VERTICAL_LINE_OFFSET_X_LEFT}
          top={VERTICAL_LINE_OFFSET_Y_LEFT}
          className={cn("absolute bg-primary")}
        />
        {/* horizontal line */}
        <DecoratorLines
          alignment="horizontal"
          position="left"
          variant="thick"
          width={`${HORIZONTAL_LINE_WIDTH_LEFT}rem`}
          left={HORIZONTAL_LINE_OFFSET_X_LEFT}
          top={HORIZONTAL_LINE_OFFSET_Y_LEFT}
          className={cn("absolute bg-primary")}
        />
        <Menu
          style={{
            top: "6.7rem",
            paddingLeft: "2.3rem",
            paddingRight: "2.3rem",
          }}
          groups={groups}
        />
      </div>
      {/* Mobile Header Name */}
      {!isProductPage && (
        <div className="relative z-11 filter-open:z-40 md:hidden mt-header-height-mobile px-mobile-content-padding-horizontal block after:content-[''] after:block after:h-[3px] after:w-[75%] after:bg-primary after:mt-[-0.8rem]">
          {headerName === "Shop" && hasFilter ? (
            <MobileFilter headerName={headerName} groups={groups} />
          ) : (
            <h1
              className={cn(
                `text-primary text-nowrap text-(length:--mobile-header-text-size) truncate`
              )}
            >
              {headerName}
            </h1>
          )}
        </div>
      )}
    </>
  );
}
