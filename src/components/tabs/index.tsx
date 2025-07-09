import { useAppActions } from "@/stores";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import styles from "./tabs.module.scss";

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
      <div className={clsx(styles.left, isMobile && styles.mobile)}>
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

      <div className={clsx(styles.right, isMobile && styles.mobile)}>
        <Link href="/contact" onClick={handleLinkClick}>
          contact
        </Link>
        <Link
          className={styles.search}
          href="/search"
          onClick={handleLinkClick}
        >
          search
          <CiSearch />
        </Link>
        <Link className={styles.cart} href="/cart" onClick={handleLinkClick}>
          cart
          <CiShoppingCart />
        </Link>
      </div>
    </>
  );
}
