import { getCartFromCookieClient } from "@/lib/cart/utils";
import Stripe from "stripe";
import { getActiveProducts } from "../stripe";

export async function getCartClient(cookies: string) {
  const cartData = getCartFromCookieClient();
  return cartData;
}

export async function getCartProductsClient(cookies: string) {
  const cartData = await getCartClient(cookies);
  const activeProducts = await getActiveProducts();

  let activeProductsArray: Stripe.Product[] = [];

  if (cartData?.products) {
    activeProductsArray = activeProducts.filter((product) =>
      cartData.products.includes(product.id)
    );
  }

  return activeProductsArray;
}
