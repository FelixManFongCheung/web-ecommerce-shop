import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { getActiveProducts } from '../stripe';
import Stripe from 'stripe';


export async function getCartClient(cookies: string) {
    const supabase = createBrowserClient();
    const { data: cartData, error } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cookies)
        .single();
        
    if (error) throw error;
    return cartData;
}

export async function getCartProductsClient(cookies: string) {
    const cartData = await getCartClient(cookies);
    const activeProducts = await getActiveProducts();

    let activeProductsArray: Stripe.Product[] = [];
  
    if (cartData.products) {
      activeProductsArray = activeProducts.filter((product) => cartData.products.includes(product.id));
    }

    return activeProductsArray;
}
