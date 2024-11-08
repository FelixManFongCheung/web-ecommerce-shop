import Stripe from 'stripe';
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json(); 
    const { origin } = new URL(req.url);

    // Retrieve price details to check its type
    const price = await stripe.prices.retrieve(priceId);

    // Common session parameters
    const baseSessionParams = {
      ui_mode: 'embedded' as Stripe.Checkout.SessionCreateParams.UiMode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      expires_at: Math.floor(Date.now() / 1000) + (3600 * 2),
    };

    // Create different session based on price type
    const session = await stripe.checkout.sessions.create({
      ...baseSessionParams,
      mode: price.type === 'recurring' ? 'subscription' : 'payment',
      ...(price.type === 'recurring' ? {
        // Subscription-specific options
        subscription_data: {
          trial_period_days: 7, // Optional: if you want to offer a trial
          // metadata: { ... } // Optional: add custom metadata
        },
        payment_method_types: ['card'], // Restrict to cards for subscriptions
      } : {
        // One-time payment specific options
        payment_method_types: ['card'], // Can include more payment methods
        // payment_intent_data: { ... } // Optional: customize payment intent
      })
    });

    return NextResponse.json({
      id: session.id, 
      clientSecret: session.client_secret,
      mode: price.type === 'recurring' ? 'subscription' : 'payment'
    });
  } catch (err) {
    if (err instanceof Error) return NextResponse.json(err.message, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const session_id = searchParams.get('session_id');

    const session =
      await stripe.checkout.sessions.retrieve(session_id!);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email
    });
  } catch (err) {
    if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
  }
}