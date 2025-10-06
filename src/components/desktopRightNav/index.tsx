import { CartPopup, DecoratorLines } from "@/components";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_RIGHT,
  HORIZONTAL_LINE_OFFSET_Y_RIGHT,
  HORIZONTAL_LINE_WIDTH_RIGHT,
  VERTICAL_LINE_HEIGHT_RIGHT,
  VERTICAL_LINE_OFFSET_X_RIGHT,
  VERTICAL_LINE_OFFSET_Y_RIGHT,
} from "@/lib/constants";
import CartBtn from "./components/cartBtn";

export default function DesktopRightNav() {
  return (
    <div
      className={`md:block hidden fixed z-11 cart-open:z-20 cart-popup right-0 top-0 h-full w-desktop-right-nav-width bg-transparent`}
    >
      <CartPopup />
      <div
        className={cn(
          "absolute flex flex-col justify-center items-center cart-open:text-secondary"
        )}
        style={{
          top: `${VERTICAL_LINE_OFFSET_Y_RIGHT}rem`,
          right: "3.5rem",
          height: `min(${
            HORIZONTAL_LINE_OFFSET_Y_RIGHT - VERTICAL_LINE_OFFSET_Y_RIGHT
          }rem, calc(100vh - var(--footer-height)))`,
        }}
      >
        <CartBtn />
      </div>
      {/* vertical line */}
      <DecoratorLines
        alignment="vertical"
        variant="thick"
        position="right"
        height={`${VERTICAL_LINE_HEIGHT_RIGHT}rem`}
        right={VERTICAL_LINE_OFFSET_X_RIGHT}
        top={VERTICAL_LINE_OFFSET_Y_RIGHT}
        className={cn(
          "absolute transition-all duration-300 ease-in-out cart-open:bg-secondary bg-primary"
        )}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        variant="thin"
        position="right"
        width={`${HORIZONTAL_LINE_WIDTH_RIGHT}rem`}
        right={HORIZONTAL_LINE_OFFSET_X_RIGHT}
        top={HORIZONTAL_LINE_OFFSET_Y_RIGHT}
        className={cn(
          "absolute transition-all duration-300 ease-in-out cart-open:bg-secondary bg-primary"
        )}
      />
    </div>
  );
}
