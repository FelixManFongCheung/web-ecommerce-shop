import { cancelOrder, completeOrder } from "@/actions/order";
import { retrieveSession } from "@/actions/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/return") {
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

        return NextResponse.redirect(new URL("/collections/all", request.url));
      }

      if (session.status === "open") {
        return NextResponse.redirect(new URL("/collections/all", request.url));
      }
    } catch (error) {
      console.error("Error in middleware processing order:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/return/:path*"],
};
