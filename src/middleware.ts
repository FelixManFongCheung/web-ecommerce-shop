import { cancelOrder, completeOrder } from "@/actions/order";
import { retrieveSession } from "@/actions/stripe";
import { updateSession } from "@/lib/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Stripe return/checkout logic
  if (pathname === "/return") {
    return await handleStripeReturn(request);
  }

  // Handle Supabase auth for all other protected routes
  return await updateSession(request);
}

// Separate function for Stripe return handling
async function handleStripeReturn(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const session = await retrieveSession(sessionId);

    if (session.status === "complete") {
      await completeOrder(sessionId);

      const url = new URL(request.url);
      url.searchParams.set("status", "complete");

      return NextResponse.rewrite(url);
    }

    if (session.status === "expired") {
      await cancelOrder(sessionId);
      return NextResponse.redirect(new URL("/cart", request.url));
    }

    if (session.status === "open") {
      return NextResponse.redirect(new URL("/cart", request.url));
    }
  } catch (error) {
    console.error("Error in middleware processing order:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/return/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
