import Stripe from 'stripe';
import styles from './product.module.scss';
import Checkout from '@/components/checkout';
import ATC from '@/components/atc';

export default async function Page({ params }: { params: { product: string } }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const product = await stripe.products.retrieve(params.product);  

  const prices = await stripe.prices.list({
    product: product.id, // Provide the product ID
  });

  const priceID = prices.data[0].id  
  
  return (
    <div className={styles['product-page-wrapper']}>
      <div className={styles['image-wrapper']}>
        <img src={product.images[0]} alt="" />
      </div>
      <div className={styles['product-info']}>
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <ATC product={product}/>
        <Checkout priceID={priceID}/>
      </div>
    </div>
  )
};