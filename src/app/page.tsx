import Image from "next/image";
import styles from "./page.module.scss"
import { Children } from "react";

export default function Home({children}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
}
