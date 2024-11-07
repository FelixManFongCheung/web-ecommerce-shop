'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import styles from './removeItem.module.scss';

interface RemoveItemProps {
  cartID: string;
  productId: string;
  children?: React.ReactNode;
}

export default function RemoveItem({ cartID, productId, children }: RemoveItemProps) {
  const supabase = createClientComponentClient();
  const [isVisible, setIsVisible] = useState(true);

  const removeFromCart = async () => {
    try {
      const { data: currentCart } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cartID)
        .single();

      if (currentCart?.products) {
        const updatedProducts = currentCart.products.filter(id => id !== productId);
        
        await supabase
          .from('sessions')
          .update({ products: updatedProducts })
          .eq('cartID', cartID);

        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={isVisible ? styles.removeItem : styles.hidden}>
      {children}
      <button onClick={removeFromCart} className="cursor-pointer ml-2">
        remove this
      </button>
    </div>
  );
}