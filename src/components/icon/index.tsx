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
            "text-3xl after:content-['*'] after:text-xl after:relative after:-top-2 !font-[Athelas_Regular]",
            fontSize &&
              `text-[${fontSize}px] after:text-[${fontSize - 8}px] after:-top-1`
          )}
        >
          proxy archive
        </div>
      </Link>
    </div>
  );
}
