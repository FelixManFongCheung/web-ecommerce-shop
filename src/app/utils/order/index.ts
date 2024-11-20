'use server'

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export async function completeOrder(sessionId: string) {
  const supabase = await createClient();
  const cookieStore = cookies();
  const cartID = cookieStore.get('cart')?.value;


  try {
    // 1. Retrieve the session with line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    });    

    const { data: currentCart } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cartID as string)
        .single();

    if (currentCart?.products) {
      const lineItems = session.line_items?.data; 
      const priceIds = lineItems?.map(item => (
        typeof item.price?.product === 'string' 
          ? item.price.product 
          : item.price?.product.id
      ));
      
      const updatedProducts = currentCart.products.filter((id: string) => !priceIds!.includes(id));

      await supabase
        .from('sessions')
        .update({ products: updatedProducts })
        .eq('cartID', cartID as string);
    }

    // 2. Process each purchased item
    for (const item of session.line_items?.data || []) {
      const productId = typeof item.price?.product === 'string' 
        ? item.price.product 
        : item.price?.product.id;

      // Deactivate the product after purchase
      await stripe.products.update(productId as string, {
        active: false,
        metadata: { 
          sold: 'true',
          sold_at: new Date().toISOString(),
          session_id: sessionId
        }
      });
      // for future use
      // await stripe.products.del(productId as string, {
        // metadata: { 
        //   sold: 'true',
        //   sold_at: new Date().toISOString(),
        //   session_id: sessionId
        // }});
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