import Stripe from 'stripe';
import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET(req: Request) {
    const client = new MongoClient(process.env.MONGODB_URI!);
    try {        
        await client.connect();
        const database = client.db("e-commerce");
        const collection = database.collection("cart");
        const allData = await collection.find({}).toArray();

        return NextResponse.json({message: allData})
    } catch (err) {
        if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
    }
}

export async function POST(req: Request) {
    const client = new MongoClient(process.env.MONGODB_URI!);

    try {
        await client.connect();
        const database = client.db("e-commerce");
        const collection = database.collection("cart");
        const { identifier, products } = await req.json(); 
        if (cookies().get('cart')) {
            await collection.updateOne(
                {identifier: cookies().get('cart')},
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