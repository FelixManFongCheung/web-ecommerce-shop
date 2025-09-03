import { cn } from "@/lib/cn/utils";
import Link from "next/link";

export default function Icon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Link href="/">
        <div className="text-3xl after:content-['*'] after:text-xl after:relative after:-top-2 !font-[Athelas_Regular]">
          proxy archive
        </div>
      </Link>
    </div>
  );
}
