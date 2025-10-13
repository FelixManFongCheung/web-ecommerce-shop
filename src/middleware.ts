import { cancelOrder, completeOrder } from "@/actions/order";
import { retrieveSession } from "@/actions/stripe";
import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  DK: "DKK",
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const geo = geolocation(request);
  const country = geo.country || "DK";

  const detectedCurrency = COUNTRY_TO_CURRENCY[country] || "DKK";
  const activeCurrency =
    request.cookies.get("user-currency")?.value || detectedCurrency;

  console.log("activeCurrency", activeCurrency, geo);

  // if (request.nextUrl.pathname === "/coming-soon") {
  //   return NextResponse.next();
  // }

  // return NextResponse.redirect(new URL("/coming-soon", request.url));

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

  // Pass pathname through headers for server components
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  response.headers.set("x-user-currency", activeCurrency);

  return response;
}

export const config = {
  matcher: [
    "/coming-soon/:path*",
    "/",
    "/return/:path*",
    "/products/:path*",
    "/collections/:path*",
    "/about/:path*",
    "/visit-us/:path*",
    "/terms-and-conditions/:path*",
    "/new-arrivals/:path*",
    "/archive/:path*",
  ],
};
