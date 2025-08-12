"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export async function getPriceId(productId: string) {
  const prices = await stripe.prices.list({
    product: productId,
  });
  return prices.data[0].id;
}

export type CollectionType = {
  metadataName: string;
  metadataQuery: string;
};

export async function searchProducts(query: string) {
  try {
    // Create two separate searches for name and description
    if (query) {
      const [nameSearch, descriptionSearch] = await Promise.all([
        stripe.products.search({
          query: `name~'${query}'`,
        }),
        stripe.products.search({
          query: `description~'${query}'`,
        }),
      ]);

      // Combine and deduplicate results
      const combinedProducts = [...nameSearch.data, ...descriptionSearch.data];
      const uniqueProducts = Array.from(
        new Map(combinedProducts.map((item) => [item.id, item])).values()
      );

      return { products: uniqueProducts };
    }
    return {};
  } catch (error) {
    console.error("Stripe search error:", error);
    throw new Error("Search failed");
  }
}

export async function getActiveProducts() {
  const products = await stripe.products.list({
    active: true,
  });
  return products.data;
}

export async function getProductsAll() {
  const products = await stripe.products.list();
  return products.data;
}

export async function getProduct(productId: string) {
  const product = await stripe.products.retrieve(productId);
  return product;
}

export async function retrieveSession(
  sessionId: string,
  options?: { expand?: string[] }
) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, options);
  return session;
}

export async function retrievePrice(priceId: string) {
  const price = await stripe.prices.retrieve(priceId);
  return price;
}

export async function updateProduct(
  productId: string,
  product: Stripe.ProductUpdateParams
) {
  await stripe.products.update(productId, product);
}

type CheckoutSessionParams<T = unknown> = Stripe.Checkout.SessionCreateParams &
  T;

export async function createCheckoutSession(params: CheckoutSessionParams) {
  const session = await stripe.checkout.sessions.create(params);
  return session;
}

export async function retrieveCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

export async function retrieveProductsByMetaDataKey(key: string) {
  const products = await stripe.products.search({
    query: `metadata['${key}']:null`,
  });
  return products.data;
}

export async function retrieveProductsByMetaDataKeyAndValue(
  key: string,
  value: string
) {
  const completeQuery = `metadata['${key}']:'${value}'`;
  const noKeyQuery = `metadata['categories']:${value}`;
  const query = key ? completeQuery : noKeyQuery;

  try {
    const products = await stripe.products.search({
      query: query,
    });
    return { products: products.data };
  } catch (error) {
    console.error("Stripe search error:", error);
    throw new Error("Search failed");
  }
}
