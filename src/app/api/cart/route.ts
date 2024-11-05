import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
    try {        
        console.log('trying to get');
        
        await client.connect();
        const database = client.db("e-commerce");
        const collection = database.collection("cart");
        const userCookies = cookies().get('cart');
        if (userCookies) {
            const sessionItems = await collection.findOne({ identifier: userCookies.value });
            return NextResponse.json(sessionItems, {status: 200}); // Return the found product
        } else {
            return NextResponse.json({ message: 'Product not found' }, {status: 404}); // Handle case when no product is found
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
        if (cookies().get('cart')) {
            await collection.updateOne(
                {identifier: cookies().get('cart')!.value},
                {$push:{products: products}},
                {upsert: true}
            )
        } else {
            cookies().set('cart', identifier, { secure: true, sameSite: 'lax' })
            await collection.insertOne({ identifier, products });        
        }
        return NextResponse.json({ message: "Data saved successfully!" });
    } catch (err) {
        if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
    }
}