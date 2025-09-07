import { retrieveSession } from "@/actions/stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const session_id = searchParams.get("session_id");

    const session = await retrieveSession(session_id!);

    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
    });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json(err.message, { status: 500 });
  }
}
