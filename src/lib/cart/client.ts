import { getCookie, setCookie } from "cookies-next";
import { CartData } from "./type";

export function getCartFromCookieClient(): CartData | null {
  try {
    const cartCookie = getCookie("cart");

    if (!cartCookie) {
      return null;
    }

    const cartData: CartData = JSON.parse(cartCookie as string);

    // Check if cart has expired
    if (new Date(cartData.expiresAt) < new Date()) {
      return null;
    }

    return cartData;
  } catch (error) {
    console.error("Error reading cart from cookie:", error);
    return null;
  }
}

export function addProductToCartClient(productId: string): void {
  const cartData = getCartFromCookieClient();
  const ONE_MONTH = 60 * 60 * 24 * 30;
  const expiresAt = new Date(Date.now() + ONE_MONTH * 1000).toISOString();

  if (cartData) {
    cartData.products.push(productId);
    setCookie("cart", JSON.stringify(cartData), {
      expires: new Date(expiresAt),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ONE_MONTH,
    });
  } else {
    setCookie(
      "cart",
      JSON.stringify({
        products: [productId],
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt,
      }),
      {
        expires: new Date(expiresAt),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ONE_MONTH,
      }
    );
  }
}

export function removeProductFromCartClient(productId: string): void {
  const cartData = getCartFromCookieClient();
  const ONE_MONTH = 60 * 60 * 24 * 30;
  const expiresAt = new Date(Date.now() + ONE_MONTH * 1000).toISOString();

  if (cartData) {
    cartData.products = cartData.products.filter((id) => id !== productId);
    setCookie("cart", JSON.stringify(cartData), {
      expires: new Date(expiresAt),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ONE_MONTH,
    });
  }
}
