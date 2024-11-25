import React from 'react';
import styles from './card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Stripe from 'stripe';
import { getPriceId, retrievePrice } from '@/app/utils/stripe';

async function ProductCard({product, collection}: {
  product: Stripe.Product;
  collection?: string;
}) {
  const priceId = await getPriceId(product.id);
  const price = await retrievePrice(priceId);

  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;
  
  return (
    <div className={styles.container}>
        <Link 
          className={styles.link} 
          href={`/collections/${collection || 'all'}/products/${product.id}`}
        >
            <Image 
              className={styles.image} 
              src={imageUrls[0]} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
            />
        </Link>
        <div className={styles['product-info']}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.brief}>{product.metadata.brief}</div>
          {product.active ?
          <div className={styles.price}>
              {price?.unit_amount}
          </div> 
          : <div className={styles.price}>
            sold out
          </div>}
        </div>
    </div>
  )
}

export default ProductCard;
