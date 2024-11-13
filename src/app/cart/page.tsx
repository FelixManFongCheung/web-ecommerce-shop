import { cookies } from 'next/headers';
import { getCart } from '@/app/utils/getCart';
import { getActiveProducts } from '@/app/utils/getActiveProducts';
import styles from './cart.module.scss';
import RemoveItem from '@/components/removeItem';


export default async function Page() {  
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;
  if (!cartID) return null;
  // Get products array from sessions where cartID matches
  const cartData = await getCart(cartID);
  const activeProducts = await getActiveProducts();  

  let activeProductsArray: string[] = [];
  let cartDataArray: string[] = [];

  if (cartData.products) {
    activeProductsArray = activeProducts.map((product) => product.id);
    cartDataArray = cartData.products.filter((item: string) => activeProductsArray.includes(item));
  }

  


  return (
    <section className={styles.cart}>
      {cartDataArray && cartDataArray.length > 0 ? 
      (cartDataArray.map((item: string) => (
        <RemoveItem key={item} cartID={cartID} productId={item}>
          <div>{item}</div>
        </RemoveItem>
      ))) : 
      (<div>empty cart</div>)}
    </section>
  )
}
