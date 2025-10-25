"use client";

import { useEffect, useRef, useCallback } from "react";

export default function InfiniteCarousel({
  children,
  scrollContainer,
}: {
  children: React.ReactNode;
  scrollContainer: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isTransitioningRef.current) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const itemSetWidth = scrollWidth / 3;

    // Add buffer to prevent flickering
    const buffer = 50;

    if (scrollLeft >= itemSetWidth * 2 - buffer) {
      isTransitioningRef.current = true;
      // Calculate the exact position within the middle section
      const positionWithinSection = scrollLeft - itemSetWidth * 2;
      // Jump to the equivalent position in the middle section
      container.scrollLeft = itemSetWidth + positionWithinSection;
      isTransitioningRef.current = false;
    } else if (scrollLeft <= buffer) {
      isTransitioningRef.current = true;
      // Calculate the exact position within the current section
      const positionWithinSection = scrollLeft;
      // Jump to the equivalent position in the middle section
      container.scrollLeft = itemSetWidth + positionWithinSection;
      isTransitioningRef.current = false;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initialize scroll position
    container.scrollLeft = 0;

    return () => {
      container.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      id={scrollContainer}
      className="relative hidden md:flex py-20 w-full overflow-x-auto no-scrollbar flex-col justify-center items-start"
    >
      {children}
    </div>
  );
}
