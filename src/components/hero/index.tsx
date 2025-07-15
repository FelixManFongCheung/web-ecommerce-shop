import Link from "next/link";
import DecoratorLines from "../decoratorLines";

export default function Hero() {
  return (
    <div className="absolute inset-0 bg-primary z-20 text-secondary">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute top-[5%] left-[5%] block h-[40%] w-[2px]">
          <DecoratorLines
            alignment="vertical"
            variant="thin"
            strokeColor="var(--color-secondary)"
          />
        </div>
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

        <div className="absolute bottom-[5%] right-[5%] block h-[40%] w-[8px]">
          <DecoratorLines
            alignment="vertical"
            variant="thick"
            strokeColor="var(--color-secondary)"
          />
        </div>
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
      <div className="flex flex-col h-full w-full items-center justify-center text-secondary">
        <strong className="text-2xl after:content-['*'] after:text-2xl after:relative after:-top-1">
          proxy archive
        </strong>
        <p className="text-xs">your gateway to an archival wardrobe</p>
      </div>
    </div>
  );
}
