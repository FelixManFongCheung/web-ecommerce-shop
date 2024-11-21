import { cookies } from 'next/headers';
import { getCartProductsServer } from '@/app/utils/getCart/server';
import styles from './cart.module.scss';
import RemoveItem from '@/components/removeItem';
import CheckoutButton from '@/components/checkout/checkoutButton';
import Stripe from 'stripe';
import Image from 'next/image';


export default async function Page() {  
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;
  if (!cartID) return null;
  // Get products array from sessions where cartID matches
  const cartDataArray = await getCartProductsServer(cartID);

  return (
    <section className={styles.cart}>
      {cartDataArray && cartDataArray.length > 0 ? 
      (cartDataArray.map((product: Stripe.Product) => (
        <RemoveItem key={product.id} cartID={cartID} productId={product.id}>
          <div className={styles['image-wrapper']}>
            <Image src={product.images[0]} alt={product.name} width={100} height={100} />
          </div>
        </RemoveItem>
      ))) : 
      (<div>empty cart</div>)}
      <CheckoutButton cartID={cartID} />
    </section>
  )
}
