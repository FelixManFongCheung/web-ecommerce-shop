import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET(req: Request, { params }: { params: { productID: string } }) {
    const client = new MongoClient(process.env.MONGODB_URI!);
    type productType = {
        id: string
    }
    const { productID } = params;
    try {
        await client.connect();
        const database = client.db("e-commerce");
        const collection = database.collection("cart");        
        const productId: string = productID;
        console.log(productId);
                
        const identifier = cookies().get('cart')
        const theSession = await collection.findOne({'identifier': identifier});
        const checkState: boolean = (theSession) ? true : false;
        let checkIfProdInCart: boolean = false;
        if (checkState) {
            checkIfProdInCart = (theSession!.products.find((item: productType) => item.id === productId)) ? true : false;
        }
        return NextResponse.json({isProductInCart: checkIfProdInCart})
    } catch (err) {
        if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
    }
}