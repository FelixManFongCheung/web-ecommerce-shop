import Link from 'next/link';
import Stripe from 'stripe';
import styles from './product.module.scss';

export default async function Page({ params }: { params: { product: string } }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const product = await stripe.products.retrieve(params.product);  

  console.log(product);
  
  
  return (
    <div className={styles['product-page-wrapper']}>
      <div className={styles['image-wrapper']}>
        <img src={product.images[0]} alt="" />
      </div>
      <div className={styles['product-info']}>
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <Link href={{ pathname: '/checkout',query: { product: product.id }}} className={styles["buy-now"]}>buy now</Link>
      </div>
    </div>
  )
};