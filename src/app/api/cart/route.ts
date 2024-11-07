import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET() {
    try {        
        const supabase = createClient();        
        const userCookies = cookies().get('cart');
        console.log(userCookies);
        if (userCookies) {
            const { data: sessionItem, error } = await supabase
                .from("sessions")
                .select("*")
                .eq("cartID", userCookies.value)
                .single();
        
            if (error) {
                return NextResponse.json({ message: error.message }, { status: 404 });
            }            
            return NextResponse.json(sessionItem, { status: 200 }); // Return the found product
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 }); // Handle case when no product is found
        }
    } catch (err) {
        if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
    }
}

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = client.db("e-commerce");
        const collection = database.collection("cart");
        const { identifier, products } = await req.json(); 
        console.log(products);
        
        if (cookies().get('cart')) {
            await collection.updateOne(
                {identifier: cookies().get('cart')!.value},
                {$push:{products: products}},
                {upsert: true}
            )
        } else {
            cookies().set('cart', identifier, { secure: true, sameSite: 'lax' })
            await collection.insertOne({ identifier, products: [products] });        
        }
        return NextResponse.json({ message: "Data saved successfully!" });
    } catch (err) {
        if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
    }
}