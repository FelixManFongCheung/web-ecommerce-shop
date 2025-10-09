"use client";

import { useEffect, useRef } from "react";

export default function InfiniteCarousel({
  children,
  scrollContainer,
}: {
  children: React.ReactNode;
  scrollContainer: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;

      const itemSetWidth = scrollWidth / 3;

      if (scrollLeft >= itemSetWidth * 2) {
        container.scrollLeft = itemSetWidth;
      } else if (scrollLeft <= 0) {
        container.scrollLeft = itemSetWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);

    container.scrollLeft = container.scrollWidth / 3;

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id={scrollContainer}
      className="relative hidden md:flex py-20 w-screen overflow-x-auto no-scrollbar flex-col justify-center items-start"
    >
      {children}
    </div>
  );
}
