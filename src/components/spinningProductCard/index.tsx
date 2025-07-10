import clsx from 'clsx';
import Link from 'next/link';
import Stripe from 'stripe';
import Image from 'next/image'

export default function SpinningProductCard({product}: {product: Stripe.Product}) {  
  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;
  

  return (
    <div className={styles['perspective-box']}>
      <div className={""}>
        <Link scroll={true} className={styles['image-wrapper']} href={`/products/${product.id}`}>
          {imageUrls.map((url, index) => (
            <div key={index} className={index === 0 ? styles['test-front'] : styles['test-back']}>
              <div className={""}>
                <Image fill src={url} alt="" />
              </div>
            </div>
          ))}
        </Link>
      </div>
    </div>
  )
};