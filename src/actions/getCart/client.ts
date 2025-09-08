import { getCartFromCookieClient } from "@/lib/cart/client";
import { getActiveProducts } from "../stripe";

export async function getCartProductsClient() {
  const cartProductIds = getCartFromCookieClient();
  const activeProducts = await getActiveProducts();

  if (!cartProductIds) {
    return [];
  }

  console.log(activeProducts);

  const cartProducts = cartProductIds.flatMap((id) => {
    const product = activeProducts.find((product) => product.id === id);
    return product ? [product] : [];
  });

  console.log(cartProducts);

  return cartProducts;
}
