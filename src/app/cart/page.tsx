import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import styles from './cart.module.scss';
import RemoveItem from '@/components/removeItem';


export default async function Cart() {  
  const supabase = createClient();
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;
  if (!cartID) return null;
  // Get products array from sessions where cartID matches
  const { data: cartData, error } = await supabase
    .from('sessions')
    .select('products')  // Assuming 'products' is your column name
    .eq('cartID', cartID)
    .single();

  if (error) {
    console.error('Error fetching cart:', error);
    return <div>Error loading cart</div>;
  }

  return (
    <div className={styles.cart}>
      {cartData && cartData.products && cartData.products.length > 0 ? 
      (cartData.products.map((item: string) => (
        <RemoveItem key={item} cartID={cartID} productId={item}>
          <div>{item}</div>
        </RemoveItem>
      ))) : 
      (<div>empty cart</div>)}
    </div>
  )
}
