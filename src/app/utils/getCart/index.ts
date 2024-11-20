import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { getActiveProducts } from '@/app/utils/getActiveProducts';


export async function getCart(cookies: string, isClient: boolean = false) {
    // Choose the appropriate client based on context
    const supabase = isClient 
        ? createBrowserClient()
        : await createServerClient();

    const { data: cartData, error } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cookies)
        .single();
        
    if (error) throw error;
    return cartData;
}

export async function getCartProducts(cartID: string, isClient: boolean = false) {
    const cartData = await getCart(cartID, isClient);
    const activeProducts = await getActiveProducts();

    let activeProductsArray: string[] = [];
    let cartDataArray: string[] = [];
  
    if (cartData.products) {
      activeProductsArray = activeProducts.map((product) => product.id);
      cartDataArray = cartData.products.filter((item: string) => activeProductsArray.includes(item));
    }

    return cartDataArray;
}

