import clsx from 'clsx';
import Link from 'next/link';
import styles from './card.module.scss';
import Stripe from 'stripe';
import Image from 'next/image'

export default function SpinningProductCard({product}: {product: Stripe.Product}) {  
  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;
  

  return (
    <div className={styles['perspective-box']}>
      <div className={styles.container}>
        <Link scroll={true} className={styles['image-wrapper']} href={`/products/${product.id}`}>
          {imageUrls.map((url, index) => (
            <div key={index} className={index === 0 ? styles['test-front'] : styles['test-back']}>
              <div className={clsx(styles.product, index === 0 ? styles['product-front'] : styles['product-back'])}>
                <Image fill src={url} alt="" />
              </div>
            </div>
          ))}
        </Link>
      </div>
    </div>
  )
};