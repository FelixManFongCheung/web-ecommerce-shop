import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { identifier, products } = await req.json();        
        const cookieStore = cookies();

        if (cookieStore.get('cart')) {
            const cartID = cookieStore.get('cart')!.value;            
            const { data: existingData } = await supabase
                .from('sessions')
                .select('products')
                .eq('cartID', cartID)
                .single();

            const updatedProducts = existingData?.products 
                ? [...existingData.products, products].flat()
                : [products];

            const { error: updateError } = await supabase
                .from('sessions')
                .upsert({
                    cartID: cartID,
                    products: updatedProducts
                }, {
                    onConflict: 'cartID'
                });

            if (updateError) throw updateError;
        } else {
            // Create new cart
            const { error: insertError } = await supabase
                .from('sessions')
                .insert({
                    cartID: identifier,
                    products: [products]
                });

            if (insertError) {
                console.error('Supabase insert error:', insertError);
                return NextResponse.json(
                    { error: insertError.message }, 
                    { status: 500 }
                );
            }

            const response = NextResponse.json({ 
                message: "Data saved successfully!",
                cartID: identifier 
            });
            
            response.cookies.set('cart', identifier, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/'
            });

            return response;
        }

        return NextResponse.json({ message: "Data saved successfully!" });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        // Ensure a response is returned even if err is not an instance of Error
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}