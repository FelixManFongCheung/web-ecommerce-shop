"use client";

import { CartPopup, TabsWrapper } from "@/components";
import { cn } from "@/lib/utils";
import { useAppActions } from "@/stores";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Header() {
  const { toggleOpen } = useAppActions();
  const headerRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && fillerRef.current) {
        const scrollHeight = window.scrollY;
        const firstDivHeight = window.innerHeight;

        if (scrollHeight >= firstDivHeight) {
          // Header becomes fixed
          headerRef.current.className =
            "fixed top-0 h-[10vh] bg-white flex z-10 w-full justify-between px-5";
          fillerRef.current.className = "h-[10vh] w-full block";
        } else {
          // Header is relative
          headerRef.current.className =
            "relative top-0 h-[10vh] bg-white flex z-10 w-full justify-between px-5";
          fillerRef.current.className = "h-[10vh] w-full hidden";
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Call once on mount to set initial state
    handleScroll();

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array - only run once
  return (
    <>
      <div
        ref={headerRef}
        className="relative top-0 h-[10vh] bg-white flex z-10 w-full justify-between px-5"
      >
        <div className="block md:hidden">
          <button className="h-full" onClick={toggleOpen}>
            <Menu />
          </button>
        </div>

        <TabsWrapper className={cn("hidden md:flex")}>
          <div className="relative flex items-center">
            <Link href="/">
              <strong className="text-lg after:content-['*'] after:text-xs after:relative after:-top-1">
                proxy archive
              </strong>
            </Link>
          </div>
        </TabsWrapper>
      </div>
      <div ref={fillerRef} className="h-[10vh] w-full hidden"></div>
      <CartPopup />
    </>
  );
}
