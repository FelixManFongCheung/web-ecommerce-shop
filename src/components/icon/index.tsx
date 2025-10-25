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
          <p className={cn(
            "!font-[Happy_Times_Italic] after:content-['*']",
            !fontSize && "text-[1.2rem] md:text-[1.5rem] after:text-xl",
          )}
          style={
            fontSize
              ? {
                  fontSize: `${fontSize}px`,
                  ["--after-font-size" as string]: `${fontSize - 8}px`,
                }
              : undefined
          }>proxy archive</p>
        </Link>
          
    </div>
  );
}
