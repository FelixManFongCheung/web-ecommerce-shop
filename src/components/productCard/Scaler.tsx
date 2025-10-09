"use client";

import { cn } from "@/lib/cn/utils";
import { useCallback, useEffect, useRef } from "react";

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

  const handleScroll = useCallback(() => {
    if (!productRef.current) return;

    const productLeft = productRef.current.getBoundingClientRect().x;
    const productRight = productLeft + 128; // productWidth
    const threshold = window.innerWidth / 2;

    if (productRight > threshold && productLeft < threshold) {
      productRef.current.style.transform = `scale(1.5)`;
      const nextSibling = productRef.current.nextSibling;
      if (nextSibling instanceof HTMLElement) {
        nextSibling.style.marginTop = "3rem";
        nextSibling.style.transition = `margin-top 0.5s ease-in-out`;
      }
      productRef.current.style.transition = `transform 0.5s ease-in-out`;
      productRef.current.style.zIndex = `10`;
    } else {
      productRef.current.style.transform = `scale(1)`;
      const nextSibling = productRef.current.nextSibling;
      if (nextSibling instanceof HTMLElement) {
        nextSibling.style.marginTop = "0";
        nextSibling.style.transition = `margin-top 0.5s ease-in-out`;
      }
      productRef.current.style.transition = `transform 0.5s ease-in-out`;
      productRef.current.style.zIndex = `0`;
    }
  }, []);

  useEffect(() => {
    if (!productRef.current || !scrollContainer) return;

    const scrollContainerElement = productRef.current.closest(
      `#${scrollContainer}`
    );
    if (!scrollContainerElement) return;

    scrollContainerElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainerElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer, handleScroll]);

  return (
    <div ref={productRef} className={cn("relative w-full h-full", className)}>
      {children}
    </div>
  );
}
