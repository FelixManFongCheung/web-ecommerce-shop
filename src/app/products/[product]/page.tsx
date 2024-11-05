import Stripe from 'stripe';
import styles from './product.module.scss';
import Checkout from '@/components/checkout';
import ATC from '@/components/atc';
import Image from 'next/image';

export default async function Page({ params }: { params: { product: string } }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const productResponse = await stripe.products.retrieve(params.product);  
  const product = {
    id: productResponse.id,
    images: productResponse.images,
    name: productResponse.name,
    description: productResponse.description
  };



  const prices = await stripe.prices.list({
    product: product.id,
  });

  const priceID = prices.data[0].id  
  
  return (
    <div className={styles['product-page-wrapper']}>
      <div className={styles['image-wrapper']}>
        <Image fill src={product.images[0]} alt="" />
      </div>
      <div className={styles['product-info']}>
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <ATC productId={product.id}/>
        <Checkout priceID={priceID}/>
      </div>
    </div>
  )
};