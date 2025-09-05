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
      className={`md:block hidden fixed z-11 right-0 top-0 h-full w-desktop-right-nav-width bg-transparent`}
    >
      <CartPopup className="md:block hidden peer" />
      <div
        className={cn(
          "absolute flex flex-col justify-center items-center peer-data-[cart-open=true]:text-secondary"
        )}
        style={{
          top: `${VERTICAL_LINE_OFFSET_Y_RIGHT}rem`,
          right: `${VERTICAL_LINE_OFFSET_X_RIGHT * 2}rem`,
          height: `${
            HORIZONTAL_LINE_OFFSET_Y_RIGHT - VERTICAL_LINE_OFFSET_Y_RIGHT
          }rem`,
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
        x={VERTICAL_LINE_OFFSET_X_RIGHT}
        y={VERTICAL_LINE_OFFSET_Y_RIGHT}
        className={cn(
          "absolute transition-all duration-300 ease-in-out peer-data-[cart-open=true]:bg-secondary bg-primary"
        )}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        variant="thin"
        position="right"
        width={`${HORIZONTAL_LINE_WIDTH_RIGHT}rem`}
        x={HORIZONTAL_LINE_OFFSET_X_RIGHT}
        y={HORIZONTAL_LINE_OFFSET_Y_RIGHT}
        className={cn(
          "absolute transition-all duration-300 ease-in-out peer-data-[cart-open=true]:bg-secondary bg-primary"
        )}
      />
    </div>
  );
}
