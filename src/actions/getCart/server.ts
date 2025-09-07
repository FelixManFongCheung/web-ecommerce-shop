import { getCartFromCookie } from "@/lib/cart/utils";
import Stripe from "stripe";
import { getActiveProducts } from "../stripe";

export async function getCartServer(cookies: string) {
  const cartData = await getCartFromCookie();
  return cartData;
}

export async function getCartProductsServer(cookies: string) {
  const cartData = await getCartServer(cookies);
  const activeProducts = await getActiveProducts();

  let activeProductsArray: Stripe.Product[] = [];

  if (cartData?.products) {
    activeProductsArray = activeProducts.filter((product) =>
      cartData.products.includes(product.id)
    );
  }

  return activeProductsArray;
}
