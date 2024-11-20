import { Stripe } from 'stripe';
import { NextResponse } from "next/server";
import { getCart } from '@/app/utils/getCart';
import { getActiveProducts } from '@/app/utils/getActiveProducts';
import { getPriceId } from '@/app/utils/getPriceId';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
    try {
      const { cartID } = await req.json(); 
      const cart = await getCart(cartID, false);
      const { origin } = new URL(req.url);

      if (!cart) {
        throw new Error('Cart not found');
      } else if (cart.products && cart.products.length < 1) {
        throw new Error('Cart is empty');
      }
      
      const activeProducts = await getActiveProducts();
      const activeProductsArray = activeProducts.map((product) => product.id);
      const cartDataArray = cart.products!.filter((item: string) => activeProductsArray.includes(item));
      const lineItems = await Promise.all(cartDataArray.map(async (id: string)=>({
        price: await getPriceId(stripe, id),
        quantity: 1,    
      })));

      const paymentArray = await Promise.all(
        lineItems.map(async (item) => {
          const price = await stripe.prices.retrieve(item.price);
          return price.type !== 'recurring' ? item : null;
        })
      ).then(results => results.filter(item => item !== null));

      const baseSessionParams = {
        success_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}&no_embed=true`,
        cancel_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}&no_embed=true`,
        expires_at: Math.floor(Date.now() / 1000) + (3600 * 2)
      }

      const session = await stripe.checkout.sessions.create({
        ...baseSessionParams,
        mode: 'payment',
        line_items: paymentArray,
        payment_method_types: ['card'],
        invoice_creation: {
            enabled: true,
        },
        payment_intent_data: {
            setup_future_usage: 'off_session',
        },
        billing_address_collection: 'required' as const,
        shipping_address_collection: 
            {
                allowed_countries: ['DK'] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
            },
        shipping_options: [
            { 
                shipping_rate: 'shr_1QJKVjEn8tbdxcgB9WpQyRVl' 
            }, 
            { 
                shipping_rate: 'shr_1QJKV1En8tbdxcgBsfS7JWNT' 
            }
        ]
      });    

      // Check if session.url is not null before redirecting
      if (session.url) {
        return NextResponse.json({ url: session.url }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      } else {
        throw new Error('Session URL is null');
      }

    } catch (err) {
      console.log('the invalid object is on top');
      if (err instanceof Error) return NextResponse.json(err.message, { status: 500 });
    }
}