import { cookies } from 'next/headers';
import { getCart } from '@/lib/mongodb';

export default async function Cart() {
  const userCookies = cookies().get('cart')?.value;
  const cartItems: string[] = await getCart(userCookies);
  
  return (
    <div>
      {cartItems && cartItems.length > 0 ? 
      (cartItems.map((item, index) => (
        <div key={index}>{item}</div>
      ))) : 
      (<div>empty cart</div>)}
    </div>
  )
};