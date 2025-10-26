"use server";
import { unstable_cache } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export const getPriceId = unstable_cache(
  async (productId: string) => {
    const prices = await stripe.prices.list({
      product: productId,
    });
    return prices.data[0].id;
  },
  ["price-id"],
  { revalidate: 3600 }
);

export type CollectionType = {
  metadataName: string;
  metadataQuery: string;
};

export const searchProducts = async (query: string) => {
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
};

export const getActiveProducts = async () => {
  const products = await stripe.products.list({
    active: true,
  });
  return products.data;
};

export const getProductsAll = async () => {
  const products = await stripe.products.list();
  return products.data;
};

export const getProduct = async (productId: string) => {
  const product = await stripe.products.retrieve(productId);
  return product;
};

export async function retrieveSession(
  sessionId: string,
  options?: { expand?: string[] }
) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, options);
  return session;
}

export const retrievePrice = async (priceId: string) => {
  const price = await stripe.prices.retrieve(priceId, {
    expand: ["currency_options"],
  });
  return {
    amount: price.unit_amount,
    currency: price.currency,
    type: price.type,
    currency_options: price.currency_options,
  };
};

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

export const retrieveCustomer = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

export const retrieveProductsByMetaDataKey = async (key: string) => {
  const products = await stripe.products.search({
    query: `metadata['${key}']:null`,
  });
  return products.data;
};

export const retrieveProductsByMetaDataKeyAndValue = async (
  key: string,
  value: string
) => {
  const query = `metadata['${key}']:'${value}'`;
  try {
    const products = await stripe.products.search({
      query: query,
    });

    return products.data;
  } catch (error) {
    console.error("Stripe search error:", error);
    throw new Error("Search failed");
  }
};

export const getShippingRates = async (): Promise<
  Stripe.Checkout.SessionCreateParams.ShippingOption[]
> => {
  const shippingRates = await stripe.shippingRates.list();
  return shippingRates.data.map((rate) => ({
    shipping_rate: rate.id,
  }));
};

// New paginated functions for infinite scroll
export const getProductsPaginated = async (
  limit: number = 10,
  startingAfter?: string
) => {
  const products = await stripe.products.list({
    limit,
    starting_after: startingAfter,
  });
  return {
    data: products.data,
    hasMore: products.has_more,
    lastProductId: products.data[products.data.length - 1]?.id,
  };
};

export const searchProductsByMetaDataKeyAndValuePaginated = async (
  key: string,
  value: string,
  limit: number = 10,
  page?: string
) => {
  const query = `metadata['${key}']:'${value}'`;
  try {
    const products = await stripe.products.search({
      query: query,
      limit,
      page: page,
    });

    return {
      data: products.data,
      hasMore: products.has_more,
      lastProductId: products.data[products.data.length - 1]?.id,
      nextPage: products.next_page,
    };
  } catch (error) {
    console.error("Stripe search error:", error);
    throw new Error("Search failed");
  }
};
