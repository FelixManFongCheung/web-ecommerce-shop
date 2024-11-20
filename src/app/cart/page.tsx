import { cookies } from 'next/headers';
import { getCartProducts } from '@/app/utils/getCart';
import styles from './cart.module.scss';
import RemoveItem from '@/components/removeItem';
import CheckoutButton from '@/components/checkout/checkoutButton';


export default async function Page() {  
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;
  if (!cartID) return null;
  // Get products array from sessions where cartID matches
  const cartDataArray = await getCartProducts(cartID, false);

  return (
    <section className={styles.cart}>
      {cartDataArray && cartDataArray.length > 0 ? 
      (cartDataArray.map((item: string) => (
        <RemoveItem key={item} cartID={cartID} productId={item}>
          <div>{item}</div>
        </RemoveItem>
      ))) : 
      (<div>empty cart</div>)}
      <CheckoutButton cartID={cartID} />
    </section>
  )
}
