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
            "after:content-['*'] relative !font-[Happy_Times_Italic]",
            !fontSize && "text-[1.2rem] md:text-[1.5rem] after:text-xl",
            // "after:absolute after:left-2 after:-top-1 md:after:-top-2",
            className
          )}
          style={
            fontSize
              ? {
                  fontSize: `${fontSize}px`,
                  ["--after-font-size" as string]: `${fontSize - 8}px`,
                }
              : undefined
          }
        >
          proxy archive
        </div>
      </Link>
    </div>
  );
}
