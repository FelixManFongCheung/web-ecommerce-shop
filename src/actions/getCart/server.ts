import { getCartFromCookie } from "@/lib/cart/server";
import Stripe from "stripe";
import { getActiveProducts } from "../stripe";

export async function getCartProductsServer() {
  const cartData = await getCartFromCookie();
  const activeProducts = await getActiveProducts();

  let activeProductsArray: Stripe.Product[] = [];

  if (cartData?.products) {
    activeProductsArray = activeProducts.filter((product) =>
      cartData.products.includes(product.id)
    );
  }

  return activeProductsArray;
}
