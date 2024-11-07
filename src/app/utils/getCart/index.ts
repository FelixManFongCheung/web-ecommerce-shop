import { createClient } from '@/lib/supabase/server';

export async function getCart(cookies: string) {
    const supabase = createClient();
    const { data: cartData, error } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cookies)
        .single();
        
    if (error) throw error;
    return cartData;
}

