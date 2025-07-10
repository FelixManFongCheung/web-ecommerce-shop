import { cn } from "@/lib/utils";
import { useAppActions } from "@/stores";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TabsWrapper({
  children,
  isMobile,
  className,
}: {
  children?: React.ReactNode;
  isMobile?: boolean;
  className?: string;
}) {
  const { toggleOpen } = useAppActions();

  const handleLinkClick = () => {
    if (isMobile) {
      toggleOpen();
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative flex items-center gap-5",
          isMobile && "md:flex md:flex-col md:items-start",
          className
        )}
      >
        <Link href="/collections/all" onClick={handleLinkClick}>
          shop
        </Link>
        <Link href="/archive" onClick={handleLinkClick}>
          archive
        </Link>
        <Link href="/about" onClick={handleLinkClick}>
          about
        </Link>
        <Link href="/visit" onClick={handleLinkClick}>
          visit us
        </Link>
      </div>

      {children}

      <div
        className={cn(
          "relative flex items-center gap-5 md:hidden",
          isMobile && "md:flex md:flex-col md:items-start",
          className
        )}
      >
        <Link href="/contact" onClick={handleLinkClick}>
          contact
        </Link>
        <Link
          className="flex items-center gap-1"
          href="/search"
          onClick={handleLinkClick}
        >
          search
          <Search className="align-[-0.2em]" />
        </Link>
        <Link
          className="flex items-center gap-1"
          href="/cart"
          onClick={handleLinkClick}
        >
          cart
          <ShoppingCart className="align-[-0.2em]" />
        </Link>
      </div>
    </>
  );
}
