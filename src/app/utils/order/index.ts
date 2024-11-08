'use server'

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function completeOrder(sessionId: string) {
  try {
    // 1. Retrieve the session with line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    });

    // 2. Process each purchased item
    for (const item of session.line_items?.data || []) {
      const productId = typeof item.price?.product === 'string' 
        ? item.price.product 
        : item.price?.product.id;

      if (!productId) continue;

      // Deactivate the product after purchase
      await stripe.products.update(productId, {
        active: false,
        metadata: { 
          sold: 'true',
          sold_at: new Date().toISOString(),
          session_id: sessionId
        }
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error processing order:', error);
    throw new Error('Failed to process order');
  }
}

export async function cancelOrder(sessionId: string) {
  console.log(sessionId);
}