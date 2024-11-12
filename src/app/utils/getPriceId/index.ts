'use server'
import Stripe from 'stripe';

export async function getPriceId(stripe: Stripe, productId: string) {
    const prices = await stripe.prices.list({
        product: productId
    });
    return prices.data[0].id;
}