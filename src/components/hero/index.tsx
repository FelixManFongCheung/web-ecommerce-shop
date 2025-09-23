import { Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_X_LEFT,
  HORIZONTAL_LINE_OFFSET_X_LEFT_MOBILE,
  HORIZONTAL_LINE_OFFSET_X_RIGHT,
  HORIZONTAL_LINE_OFFSET_X_RIGHT_MOBILE,
  VERTICAL_LINE_HEIGHT_LEFT,
  VERTICAL_LINE_HEIGHT_LEFT_MOBILE,
  VERTICAL_LINE_HEIGHT_RIGHT,
  VERTICAL_LINE_HEIGHT_RIGHT_MOBILE,
  VERTICAL_LINE_OFFSET_X_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT_MOBILE,
  VERTICAL_LINE_OFFSET_X_RIGHT,
  VERTICAL_LINE_OFFSET_X_RIGHT_MOBILE,
  VERTICAL_LINE_OFFSET_Y_LEFT,
  VERTICAL_LINE_OFFSET_Y_LEFT_MOBILE,
  VERTICAL_LINE_OFFSET_Y_RIGHT,
  VERTICAL_LINE_OFFSET_Y_RIGHT_MOBILE,
} from "@/lib/constants";
import Link from "next/link";
import DecoratorLines from "../decoratorLines";
import { HeroRandomImageScreen } from "./HeroRandomImageScreen";

export function HeroDesktop({ images }: { images: string[] }) {
  return (
    <div className="relative w-screen h-screen md:block hidden bg-primary">
      {images.length > 0 && <HeroRandomImageScreen images={images} />}
      <div
        className="absolute bottom-0 left-0 h-[80%] flex flex-col w-[40%] text-secondary"
        style={{
          paddingBottom: `${VERTICAL_LINE_OFFSET_Y_LEFT}rem`,
        }}
      >
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1 relative">
          <DecoratorLines
            alignment="horizontal"
            variant="thick"
            className={cn("bg-secondary absolute")}
            position="left"
            left={HORIZONTAL_LINE_OFFSET_X_LEFT}
            top={0}
            width="70%"
          />
          <Link
            href="/collections/all"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT * 1.2}rem`,
            }}
          >
            <h1 className="text-nowrap text-6xl">Shop</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            className={cn("absolute bg-secondary")}
            position="left"
            bottom={0}
            left={HORIZONTAL_LINE_OFFSET_X_LEFT}
            width="50%"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 relative">
          <Link
            href="/about"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT * 1.2}rem`,
            }}
          >
            <h1 className="text-nowrap text-6xl">About</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            className={cn("absolute bg-secondary")}
            position="left"
            bottom={0}
            left={HORIZONTAL_LINE_OFFSET_X_LEFT}
            width="100%"
          />
        </div>
        <div className="flex-1 relative">
          <Link
            href="/visit-us"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT * 1.2}rem`,
            }}
          >
            <h1 className="text-nowrap text-6xl">Visit Us</h1>
          </Link>
        </div>
        <DecoratorLines
          alignment="vertical"
          position="left"
          variant="thin"
          left={VERTICAL_LINE_OFFSET_X_LEFT}
          bottom={VERTICAL_LINE_OFFSET_Y_LEFT}
          height={`${VERTICAL_LINE_HEIGHT_LEFT}rem`}
          className={cn("absolute bg-secondary")}
        />
      </div>
      <div
        className="absolute top-0 right-0 h-[80%] flex flex-col w-[40%] text-secondary"
        style={{
          paddingTop: `${VERTICAL_LINE_OFFSET_Y_RIGHT}rem`,
        }}
      >
        <div className="flex-1 relative">
          <Link
            href="/new-arrivals"
            className="absolute bottom-[0.225rem] w-full text-right backdrop-blur-sm"
            style={{
              paddingRight: `${VERTICAL_LINE_OFFSET_X_RIGHT * 1.2}rem`,
            }}
          >
            <h1 className="text-nowrap text-6xl">New Arrivals</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            position="right"
            variant="thin"
            bottom={0}
            right={HORIZONTAL_LINE_OFFSET_X_RIGHT}
            width="70%"
            className={cn("absolute bg-secondary")}
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 relative">
          <Link
            href="/archive"
            className="absolute bottom-[0.6rem] w-full text-right backdrop-blur-sm"
            style={{
              paddingRight: `${VERTICAL_LINE_OFFSET_X_RIGHT * 1.2}rem`,
            }}
          >
            <h1 className="text-nowrap text-6xl">Archive</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            className={cn("absolute bg-secondary")}
            position="right"
            bottom={0}
            right={HORIZONTAL_LINE_OFFSET_X_RIGHT}
            width="40%"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <DecoratorLines
          alignment="vertical"
          position="right"
          variant="medium"
          right={VERTICAL_LINE_OFFSET_X_RIGHT}
          top={VERTICAL_LINE_OFFSET_Y_RIGHT}
          height={`${VERTICAL_LINE_HEIGHT_RIGHT}rem`}
          className={cn("absolute bg-secondary")}
        />
      </div>
      <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] items-center justify-center text-secondary backdrop-blur-sm">
        <Icon />
        <p className="text-xs">your gateway to an archival wardrobe</p>
      </div>
    </div>
  );
}
export function HeroMobile({ images }: { images: string[] }) {
  return (
    <div className="relative w-screen h-screen bg-primary md:hidden block">
      {images.length > 0 && <HeroRandomImageScreen images={images} />}
      <div
        className="absolute top-0 left-0 h-[60%] flex flex-col w-full text-secondary"
        style={{
          paddingTop: `${VERTICAL_LINE_OFFSET_Y_LEFT_MOBILE}rem`,
        }}
      >
        <div className="flex-1 relative">
          <Link
            href="/collections/all"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT_MOBILE}rem`,
            }}
          >
            <h1 className="text-nowrap text-5xl">Shop</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            className={cn("absolute bg-secondary")}
            position="left"
            bottom={0}
            left={HORIZONTAL_LINE_OFFSET_X_LEFT_MOBILE}
            width="70%"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 relative">
          <Link
            href="/about"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT_MOBILE}rem`,
            }}
          >
            <h1 className="text-nowrap text-5xl">About</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="medium"
            className={cn("absolute bg-secondary")}
            position="left"
            bottom={0}
            left={HORIZONTAL_LINE_OFFSET_X_LEFT_MOBILE}
            width="42%"
          />
        </div>
        <div className="flex-1 relative">
          <Link
            href="/visit-us"
            className="absolute bottom-[0.6rem] backdrop-blur-sm"
            style={{
              paddingLeft: `${VERTICAL_LINE_OFFSET_X_LEFT_MOBILE}rem`,
            }}
          >
            <h1 className="text-nowrap text-5xl">Visit Us</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="thick"
            className={cn("absolute bg-secondary")}
            position="left"
            bottom={0}
            left={HORIZONTAL_LINE_OFFSET_X_LEFT_MOBILE}
            width="85%"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <DecoratorLines
          alignment="vertical"
          position="left"
          variant="thin"
          left={VERTICAL_LINE_OFFSET_X_LEFT_MOBILE}
          top={VERTICAL_LINE_OFFSET_Y_LEFT_MOBILE}
          height={`${VERTICAL_LINE_HEIGHT_LEFT_MOBILE}rem`}
          className={cn("absolute bg-secondary")}
        />
      </div>
      <div
        className="absolute bottom-0 right-0 h-[60%] flex flex-col w-full text-secondary"
        style={{
          paddingBottom: `${VERTICAL_LINE_OFFSET_Y_RIGHT_MOBILE * 2}rem`,
        }}
      >
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1 relative">
          <Link
            href="/new-arrivals"
            className="absolute bottom-[0.225rem] w-full text-right backdrop-blur-sm"
            style={{
              paddingRight: `${VERTICAL_LINE_OFFSET_X_RIGHT_MOBILE}rem`,
            }}
          >
            <h1 className="text-nowrap text-5xl">New Arrivals</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            position="right"
            variant="medium"
            bottom={0}
            right={HORIZONTAL_LINE_OFFSET_X_RIGHT_MOBILE}
            width="42%"
            className={cn("absolute bg-secondary")}
          />
        </div>
        <div className="flex-1 relative">
          <Link
            href="/archive"
            className="absolute bottom-[0.6rem] w-full text-right backdrop-blur-sm"
            style={{
              paddingRight: `${VERTICAL_LINE_OFFSET_X_RIGHT_MOBILE}rem`,
            }}
          >
            <h1 className="text-nowrap text-5xl">Archive</h1>
          </Link>
          <DecoratorLines
            alignment="horizontal"
            variant="thin"
            className={cn("absolute bg-secondary")}
            position="right"
            bottom={0}
            right={HORIZONTAL_LINE_OFFSET_X_RIGHT_MOBILE}
            width="85%"
          />
        </div>
        <DecoratorLines
          alignment="vertical"
          position="right"
          variant="medium"
          right={VERTICAL_LINE_OFFSET_X_RIGHT_MOBILE}
          bottom={VERTICAL_LINE_OFFSET_Y_RIGHT_MOBILE}
          height={`${VERTICAL_LINE_HEIGHT_RIGHT_MOBILE}rem`}
          className={cn("absolute bg-secondary")}
        />
      </div>
      <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] items-center justify-center text-secondary backdrop-blur-sm">
        <Icon />
        <p className="text-sm">your gateway to an archival wardrobe</p>
      </div>
    </div>
  );
}

export function Hero({ images }: { images: string[] }) {
  return (
    <>
      <HeroDesktop images={images} />
      <HeroMobile images={images} />
    </>
  );
}
