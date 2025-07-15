import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Icon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Link href="/">
        <strong className="text-lg after:content-['*'] after:text-xs after:relative after:-top-1">
          proxy archive
        </strong>
      </Link>
    </div>
  );
}
