import Stripe from 'stripe';

export async function getActiveProducts() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const products = await stripe.products.list({
      active: true
    });
    return products.data;  
}