import { getActiveProducts } from "../stripe";

export async function getCartProductsClient(productIds: string[]) {
  const activeProducts = await getActiveProducts();

  console.log(`Active products: ${activeProducts.length}`);

  const cartProducts = productIds.flatMap((id) => {
    const product = activeProducts.find((product) => product.id === id);
    return product ? [product] : [];
  });

  return cartProducts;
}
