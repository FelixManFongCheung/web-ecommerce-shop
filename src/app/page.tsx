import Hero from "@/components/hero";
import styles from "./page.module.scss"

export default function Home() {
  return (
    <section className={styles['homepage']}>
      <Hero />
      <div className={styles['homepage__content']}></div>
    </section>
  );
}
