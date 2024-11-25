import styles from './productSkeleton.module.scss'

export default function ProductCardSkeleton() {
  return (
    <div className={`${styles.container} ${styles.skeleton}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageSkeleton} />
      </div>
      <div className={styles['product-info']}>
        <div className={styles.nameSkeleton} />
        <div className={styles.briefSkeleton} />
        <div className={styles.priceSkeleton} />
      </div>
    </div>
  )
}