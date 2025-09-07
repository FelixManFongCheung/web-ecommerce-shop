import { cancelOrder, completeOrder } from "@/actions/order";
import { retrieveSession } from "@/actions/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only handle the return page
  if (pathname === "/return") {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      // Redirect to home if no session_id
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Retrieve the session to check its status
      const session = await retrieveSession(sessionId);

      console.log("session", session);

      // Handle different session statuses
      if (session.status === "complete") {
        // Process completed order
        await completeOrder(sessionId);

        // Continue to the return page with success status
        const url = request.nextUrl.clone();
        url.searchParams.set("status", "complete");
        return NextResponse.next();
      }

      if (session.status === "expired") {
        // Process cancelled order
        await cancelOrder(sessionId);

        // Redirect to cart
        return NextResponse.redirect(new URL("/cart", request.url));
      }

      if (session.status === "open") {
        // Redirect to cart if session is still open
        return NextResponse.redirect(new URL("/cart", request.url));
      }
    } catch (error) {
      console.error("Error in middleware processing order:", error);
      // Redirect to home on error
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Continue to the requested page for all other routes
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/return/:path*",
    // Add other paths if needed
  ],
};
