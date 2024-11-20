import { createClient as createServerClient } from '@/lib/supabase/server';
import { getActiveProducts } from '../stripe';

export async function getCartServer(cookies: string) {
    const supabase = await createServerClient();
    const { data: cartData, error } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cookies)
        .single();
        
    if (error) throw error;
    return cartData;
}

export async function getCartProductsServer(cookies: string) {
    const cartData = await getCartServer(cookies);
    const activeProducts = await getActiveProducts();

    let activeProductsArray: string[] = [];
    let cartDataArray: string[] = [];
  
    if (cartData.products) {
      activeProductsArray = activeProducts.map((product) => product.id);
      cartDataArray = cartData.products.filter((item: string) => activeProductsArray.includes(item));
    }

    return cartDataArray;
}
