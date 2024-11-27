import { cookies } from 'next/headers';
import { getCartProductsServer } from '@/app/utils/getCart/server';
import styles from './cart.module.scss';
import RemoveItem from '@/components/removeItem';
import CheckoutButton from '@/components/checkout/checkoutButton';
import Stripe from 'stripe';
import Image from 'next/image';

function CartItems({cartDataArray, cartID}: {cartDataArray: Stripe.Product[], cartID: string}) {
  return (
    cartDataArray.map((product: Stripe.Product) => (
      <RemoveItem key={product.id} cartID={cartID} productId={product.id}>
        <div className={styles['image-wrapper']}>
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </RemoveItem>
    ))
  )
}


export default async function Page() {  
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;
  if (!cartID) return <div>empty cart</div>;

  const cartDataArray = await getCartProductsServer(cartID);
  if (!cartDataArray) return <div>empty cart</div>;
  
  return (
    <section className={styles.cart}>
      {cartDataArray && cartDataArray.length > 0 ? 
        (<>
          <CartItems cartDataArray={cartDataArray} cartID={cartID} />
          <CheckoutButton cartID={cartID} />
        </>)
      : (<div>empty cart</div>)}
    </section>
  )
}
