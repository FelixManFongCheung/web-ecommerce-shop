import Stripe from 'stripe';
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json(); 
    const { origin } = new URL(req.url);
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url:
        `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    console.log(session)
    return NextResponse.json({id: session.id, clientSecret: session.client_secret});
  } catch (err) {
    if (err instanceof Error) return NextResponse.json(err.message, { status: 500 });

  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sessionQuery = searchParams.get('session_id');

    const session =
      await stripe.checkout.sessions.retrieve(sessionQuery!);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email
    });
  } catch (err) {
    if (err instanceof Error) return NextResponse.json(err.message, { status:  500 });
  }
}