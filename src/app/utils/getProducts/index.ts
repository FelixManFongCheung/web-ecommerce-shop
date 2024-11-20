'use server'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

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

    return {};
  } catch (error) {
    console.error('Stripe search error:', error);
    throw new Error('Search failed');
  }
}