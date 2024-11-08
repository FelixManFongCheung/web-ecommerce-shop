'use server'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function searchProducts(query: string) {
  try {
    // Create two separate searches for name and description
    if (query) {
      const [nameSearch, descriptionSearch] = await Promise.all([
        stripe.products.search({
          query: `active:'true' AND name~'${query}'`,
        }),
        stripe.products.search({
          query: `active:'true' AND description~'${query}'`,
        })
      ]);

      // Combine and deduplicate results
      const combinedProducts = [...nameSearch.data, ...descriptionSearch.data];
      const uniqueProducts = Array.from(
        new Map(combinedProducts.map(item => [item.id, item])).values()
      );

      return { products: uniqueProducts };
    }

    // If no query, just return active products
    const products = await stripe.products.search({
      query: "active:'true'",
    });

    return { products: products.data };
  } catch (error) {
    console.error('Stripe search error:', error);
    throw new Error('Search failed');
  }
}