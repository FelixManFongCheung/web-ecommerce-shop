import clsx from 'clsx';
import Link from 'next/link';
import styles from './main.module.scss';
import Stripe from 'stripe';

export default function ProductCard({product}: {product: Stripe.Product}) {  
  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;
  

  return (
    <Link scroll={true} className={styles['image-wrapper']} href={`/products/${product.id}`}>
      {imageUrls.map((url, index) => (
        <div className={index === 0 ? styles['test-front'] : styles['test-back']}>
          <div className={clsx(styles.product, index === 0 ? styles['product-front'] : styles['product-back'])}>
            <img src={url} alt="" />
          </div>
        </div>
      ))}
    </Link>
  )
};