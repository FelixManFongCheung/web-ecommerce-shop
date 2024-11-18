import React from 'react';
import styles from './card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Stripe from 'stripe';

export default function ProductCard({product}: {product: Stripe.Product}) {
  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;
  return (
    <div className={styles.container}>
        <Link className={styles.link} href={`/products/${product.id}`}>
            <Image className={styles.image} src={imageUrls[0]} alt={product.name} fill />
        </Link>
    </div>
  )
}
