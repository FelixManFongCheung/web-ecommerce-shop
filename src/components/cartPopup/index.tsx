'use client'

import useAppStore, { AppState } from '@/stores';
import { getCartProductsClient } from '@/app/utils/getCart/client';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import styles from './cartPopup.module.scss'

export function CartPopup() {
  const isCartOpen = useAppStore((state: AppState) => state.isCartOpen);
  const toggleCart = useAppStore((state: AppState) => state.toggleCart);
  const cartCookies = getCookie('cart');
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    const showCartProducts = async () => {
        console.log('cartCookies', cartCookies);
        
        if (cartCookies) {
          const cartProducts = await getCartProductsClient(cartCookies as string);
          setCartProducts(cartProducts);
        }
    }
    showCartProducts();
  }, [cartCookies]);

  if (!isCartOpen) return null

  return (
    <div className={styles['cart-popup']}>
      <div className={styles['cart-popup__overlay']} onClick={toggleCart} />
      <div className={styles['cart-popup__content']}>
        <div className={styles['cart-popup__header']}>
          <h2>Your Cart</h2>
          <button onClick={toggleCart}>×</button>
        </div>
        {cartProducts.map((productId) => (
          <div key={productId}>{productId}</div>
        ))}
      </div>
    </div>
  )
}