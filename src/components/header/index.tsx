"use client";

import { useAppActions } from "@/stores";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { CartPopup } from "../cartPopup";
import TabsWrapper from "../tabs";
import styles from "./header.module.scss";

export default function Header() {
  const { toggleOpen } = useAppActions();
  return (
    <>
      <div className={styles.header}>
        <div className="mobile-only">
          <button className={styles.menu} onClick={toggleOpen}>
            <CiMenuBurger />
          </button>
        </div>

        <TabsWrapper>
          <div className={styles.middle}>
            <Link href="/">
              <strong>proxy archive</strong>
            </Link>
          </div>
        </TabsWrapper>
      </div>
      <CartPopup />
    </>
  );
}
