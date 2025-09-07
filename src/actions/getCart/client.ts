import { getCartFromCookieClient } from "@/lib/cart/client";
import { getActiveProducts } from "../stripe";

export async function getCartProductsClient() {
  const cartData = getCartFromCookieClient();
  const activeProducts = await getActiveProducts();

  if (!cartData || !cartData.products) {
    return [];
  }

  const cartProductIds = cartData.products;
  const cartProducts = cartProductIds.flatMap((id) => {
    const product = activeProducts.find((product) => product.id === id);
    return product ? [product] : [];
  });

  return cartProducts;
}
