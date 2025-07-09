"use client";

import { useAppActions, useIsOpen } from "@/stores";
import clsx from "clsx";
import TabsWrapper from "../tabs";
import styles from "./mobilenav.module.scss";

export default function MobileNav() {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();

  return (
    <div className={clsx(styles["mobile-nav-wrapper"], isOpen && styles.open)}>
      <div className={styles["mobile-nav-backdrop"]} onClick={toggleOpen}></div>
      <div className={styles["mobile-nav-content"]}>
        <TabsWrapper isMobile={true} />
      </div>
    </div>
  );
}
