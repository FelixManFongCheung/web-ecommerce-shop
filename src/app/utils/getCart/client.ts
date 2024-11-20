import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { getActiveProducts } from '@/app/utils/getActiveProducts';

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

    let activeProductsArray: string[] = [];
    let cartDataArray: string[] = [];
  
    if (cartData.products) {
      activeProductsArray = activeProducts.map((product) => product.id);
      cartDataArray = cartData.products.filter((item: string) => activeProductsArray.includes(item));
    }

    return cartDataArray;
}
