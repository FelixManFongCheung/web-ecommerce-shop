import Stripe from 'stripe';
import { NextResponse } from "next/server";
import { retrievePrice, retrieveSession, retrieveCustomer, createCheckoutSession } from '@/app/utils/stripe';

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json(); 
    const { origin } = new URL(req.url);    

    // Retrieve price details to check its type
    const price = await retrievePrice(priceId);

    // Common session parameters
    const baseSessionParams = {
      ui_mode: 'embedded' as const, // to satisfy union type 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      expires_at: Math.floor(Date.now() / 1000) + (3600 * 2),
    };

    // Create different session based on price type
    const session = await createCheckoutSession({
      ...baseSessionParams,
      mode: price.type === 'recurring' ? 'subscription' : 'payment',
      ...(price.type === 'recurring' 
        ? {
            // Subscription-specific options
            subscription_data: {
              trial_period_days: 7,
            },
            payment_method_types: ['card'],
          }
        : {
          // One-time payment specific options
          payment_method_types: ['card'],
          invoice_creation: {
            enabled: true,
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
        }
      )
    });    

    return NextResponse.json({
      id: session.id, 
      clientSecret: session.client_secret,
      mode: price.type === 'recurring' ? 'subscription' : 'payment'
    });
  } catch (err) {
    console.log('the invalid object is on top');
    
    if (err instanceof Error) return NextResponse.json(err.message, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const session_id = searchParams.get('session_id');

    const session = await retrieveSession(session_id!);
    const customer = await retrieveCustomer(session.customer as string);


    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: (customer as Stripe.Customer).email
    });
  } catch (err) {
    if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
  }
}