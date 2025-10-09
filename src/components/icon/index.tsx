import { cn } from "@/lib/cn/utils";
import Link from "next/link";

export default function Icon({
  className,
  fontSize,
}: {
  className?: string;
  fontSize?: number;
}) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Link href="/">
        <div
          className={cn(
            "text-[1.2rem] md:text-3xl after:content-['*'] after:text-xl after:relative after:-top-1 md:after:-top-2 !font-[Happy_Times_Italic]",
            fontSize &&
              `text-[${fontSize}px] md:text-[${fontSize}px] after:text-[${
                fontSize - 8
              }px] md:after:text-[${
                fontSize - 8
              }px] after:-top-1 md:after:-top-1`
          )}
        >
          proxy archive
        </div>
      </Link>
    </div>
  );
}
