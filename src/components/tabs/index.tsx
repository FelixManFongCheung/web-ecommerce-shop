import { useAppActions } from "@/stores";
import clsx from "clsx";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TabsWrapper({
  children,
  isMobile,
}: {
  children?: React.ReactNode;
  isMobile?: boolean;
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
        className={clsx(
          "relative flex items-center gap-5 md:hidden",
          isMobile && "md:flex md:flex-col md:items-start"
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
        className={clsx(
          "relative flex items-center gap-5 md:hidden",
          isMobile && "md:flex md:flex-col md:items-start"
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
