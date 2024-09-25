import clsx from 'clsx';
import Link from 'next/link';
import styles from './main.module.scss';

export default function ProductCard({url}: {url:string}) {  
  return (
    <Link scroll={true} className={styles['image-wrapper']} href="/products/product">
      <div className={styles['test-front']}>
        <div className={clsx(styles.product, styles['product-front'])}>
          <img src={url} alt="pic" />
        </div>
      </div>
      <div className={styles['test-back']}>
        <div className={clsx(styles.product, styles['product-back'])}>
          <img src={url} alt="pic" />
        </div>
      </div>
    </Link>
  )
};