import { MongoClient } from "mongodb";


export const getCart = async (cookies: string | undefined) => {
    try {        
        const client = new MongoClient(process.env.MONGODB_URI!);
        console.log('trying to get');
        await client.connect();        
        const database = client.db("e-commerce");
        const collection = database.collection("cart");
        if (cookies) {
            const sessionItems = await collection.findOne({ identifier: cookies });
            return sessionItems?.products;
        }
        return {}
    } catch (err) {
        console.log('error fetching: ', err);
    }
}