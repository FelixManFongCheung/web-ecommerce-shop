'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { revalidateProductPage } from '@/utils/revalidateProductPage';

interface RemoveItemProps {
  cartID: string;
  productId: string;
  children?: React.ReactNode;
}

export default function RemoveItem({ cartID, productId, children }: RemoveItemProps) {
  const supabase = createClient();
  const [isVisible, setIsVisible] = useState(true);

  const removeFromCart = async () => {
    try {
      const { data: currentCart } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cartID)
        .single();

      if (currentCart?.products) {
        const updatedProducts = currentCart.products.filter((id: string) => id !== productId);
        
        await supabase
          .from('sessions')
          .update({ products: updatedProducts })
          .eq('cartID', cartID);

        setIsVisible(false);
        await revalidateProductPage('/collections/[collection]/products/[product]')
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={isVisible ? "" : ""}>
      {children}
      <button onClick={removeFromCart} className="cursor-pointer ml-2">
        remove this
      </button>
    </div>
  );
}