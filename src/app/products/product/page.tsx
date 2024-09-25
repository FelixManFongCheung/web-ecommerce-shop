import styles from './product.module.scss';
import clsx from 'clsx';

export default function Product({url}: {url:string}) {  
  return (
    <a className={styles['image-wrapper']} href="">
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
    </a>
  )
};