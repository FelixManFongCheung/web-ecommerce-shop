import Stripe from 'stripe';
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { priceID } = body;
  const { origin } = new URL(req.url);
  switch (req.method) {
    case "POST":
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: '{{PRICE_ID}}',
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        NextResponse.json({clientSecret: session.client_secret});
      } catch (err) {
        if (err instanceof Error) NextResponse.json(err.message, { status: 500 });

      }
      break;
    case "GET":
      try {
        const { searchParams } = new URL(req.url);

        const sessionQuery = searchParams.get('session_id');

        const session =
          await stripe.checkout.sessions.retrieve(sessionQuery!);

        NextResponse.json({
          status: session.status,
          customer_email: session.customer_details?.email
        });
      } catch (err) {
        if (err instanceof Error) NextResponse.json(err.message, { status:  500 });
      }
      break;
    default:
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      NextResponse.json({headers});
      NextResponse.json({status: 405});
  }
}