import { getCartFromCookie } from "@/lib/cart/server";
import Stripe from "stripe";
import { getActiveProducts } from "../stripe";

export async function getCartProductsServer() {
  const cartData = await getCartFromCookie();
  const activeProducts = await getActiveProducts();

  console.log(activeProducts);
  let cartProducts: Stripe.Product[] = [];

  if (!cartData) {
    return [];
  }

  if (cartData.products) {
    cartProducts = activeProducts.filter((product) =>
      cartData.products.includes(product.id)
    );
  }

  return cartProducts;
}
