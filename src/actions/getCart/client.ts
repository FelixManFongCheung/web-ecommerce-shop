import { getCartFromCookieClient } from "@/lib/cart/client";
import Stripe from "stripe";
import { getActiveProducts } from "../stripe";

export async function getCartProductsClient() {
  const cartData = await getCartFromCookieClient();
  const activeProducts = await getActiveProducts();

  let activeProductsArray: Stripe.Product[] = [];

  if (cartData?.products) {
    activeProductsArray = activeProducts.filter((product) =>
      cartData.products.includes(product.id)
    );
  }

  return activeProductsArray;
}
