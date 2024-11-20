import styles from './product.module.scss';
import Checkout from '@/components/checkout';
import ATC from '@/components/atc';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getCartServer } from '@/app/utils/getCart/server';
import { getProduct, getPriceId } from '@/app/utils/stripe';

export default async function Page({ params }: { params: { product: string } }) {
  const userCookies = cookies().get('cart')?.value;
  let isATC: boolean = false;
  if (userCookies) {
    const cartItems = await getCartServer(userCookies);
    isATC = cartItems.products?.includes(params.product) || false;
  }
  
  
  const productResponse = await getProduct(params.product);  
  const product = {
    id: productResponse.id,
    images: productResponse.images,
    name: productResponse.name,
    description: productResponse.description
  };

  const priceID = await getPriceId(product.id);
  
  return (
    <section className={styles['product-page-wrapper']}>
      <div className={styles['image-wrapper']}>
        <Image fill src={product.images[0]} alt="" />
      </div>
      <div className={styles['product-info']}>
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <ATC isATC={isATC} productId={product.id}/>
        <Checkout priceID={priceID}/>
      </div>
    </section>
  )
};