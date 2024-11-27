import Stripe from 'stripe';
import { NextResponse } from "next/server";
import { retrieveSession, retrieveCustomer } from '@/app/utils/stripe';

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