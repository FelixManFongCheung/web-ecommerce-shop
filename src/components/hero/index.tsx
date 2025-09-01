import { cn } from "@/lib/cn/utils";
import {
  VERTICAL_LINE_HEIGHT_LEFT,
  VERTICAL_LINE_HEIGHT_RIGHT,
  VERTICAL_LINE_OFFSET_X_LEFT,
  VERTICAL_LINE_OFFSET_X_RIGHT,
  VERTICAL_LINE_OFFSET_Y_LEFT,
  VERTICAL_LINE_OFFSET_Y_RIGHT,
} from "@/lib/constants";
import Link from "next/link";
import DecoratorLines from "../decoratorLines";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col absolute inset-0 items-center justify-center text-secondary bg-primary">
        <strong className="text-2xl after:content-['*'] after:text-2xl after:relative after:-top-1">
          proxy archive
        </strong>
        <p className="text-xs">your gateway to an archival wardrobe</p>
      </div>
      <div className="absolute bottom-0 left-0 h-full w-desktop-left-nav-width text-secondary">
        <DecoratorLines
          alignment="vertical"
          position="left"
          variant="thin"
          x={VERTICAL_LINE_OFFSET_X_LEFT}
          y={VERTICAL_LINE_OFFSET_Y_LEFT}
          height={`${VERTICAL_LINE_HEIGHT_LEFT}rem`}
          strokeColor="var(--color-secondary)"
          className={cn("absolute")}
        />
        <div className="absolute top-[12%] left-[3%] block h-[4px] w-[75%]">
          <Link href="/collections/all" className="relative left-[5%]">
            Shop
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            strokeColor="var(--color-secondary)"
          />
        </div>
        <div className="absolute top-[22%] left-[3%] block h-[4px] w-[22%]">
          <Link href="/about" className="relative left-[5%]">
            About
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            strokeColor="var(--color-secondary)"
          />
        </div>
        <div className="absolute top-[30%] left-[3%] block h-[8px] w-[45%]">
          <Link href="/visit-us" className="relative left-[5%]">
            Visit Us
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="thick"
            strokeColor="var(--color-secondary)"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-desktop-right-nav-width text-secondary">
        <DecoratorLines
          alignment="vertical"
          position="right"
          variant="medium"
          strokeColor="var(--color-secondary)"
          x={VERTICAL_LINE_OFFSET_X_RIGHT}
          y={VERTICAL_LINE_OFFSET_Y_RIGHT}
          height={`${VERTICAL_LINE_HEIGHT_RIGHT}rem`}
          className={cn("absolute")}
          styles={{
            height: `${VERTICAL_LINE_HEIGHT_RIGHT}rem`,
          }}
        />
        <div className="absolute bottom-[16%] right-[3%] block h-[4px] w-[22%]">
          <Link href="/new-arrivals" className="relative right-[5%]">
            New Arrivals
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            strokeColor="var(--color-secondary)"
          />
        </div>
        <div className="absolute bottom-[8%] right-[3%] block h-[4px] w-[45%]">
          <Link href="/archive" className="relative right-[5%]">
            Archive
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="thin"
            strokeColor="var(--color-secondary)"
          />
        </div>
      </div>
    </>
  );
}
