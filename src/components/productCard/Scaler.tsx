"use client";

import { cn } from "@/lib/cn/utils";
import { useEffect, useRef } from "react";

export default function Scaler({
  className,
  children,
  scrollContainer,
}: {
  className?: string;
  children: React.ReactNode;
  scrollContainer?: string;
}) {
  const productRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (productRef.current && scrollContainer) {
      const scrollContainerElement = productRef.current.closest(
        `#${scrollContainer}`
      );
      if (scrollContainerElement) {
        // const windowWidth = scrollContainerElement.clientWidth / 3;
        console.log(productRef.current.getBoundingClientRect().x);
        scrollContainerElement.addEventListener("scroll", () => {
          console.log(scrollContainerElement.scrollLeft);
        });

        return () => {
          scrollContainerElement.removeEventListener("scroll", () => {
            console.log(scrollContainerElement.scrollLeft);
          });
        };
      }
    }
  }, [scrollContainer]);

  return (
    <div ref={productRef} className={cn("relative w-full h-full", className)}>
      {children}
    </div>
  );
}
