import { getActiveProducts } from "../stripe";

export async function getCartProductsClient(productIds: string[]) {
  const activeProducts = await getActiveProducts();
  const productMap = new Map(activeProducts.map((product) => [product.id, product]));

  const cartProducts = productIds.map((id) => productMap.get(id)).filter((product) => product !== undefined);

  return cartProducts;
}
