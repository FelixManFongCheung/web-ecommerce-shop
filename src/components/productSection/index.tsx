import Stripe from 'stripe';
import Filter from '../filter';

export default function ProductsSection({ initialProducts }: { initialProducts: Stripe.Product[] }) {
  const relevantFilters = ['categories', 'designers'];
  const filters = initialProducts.reduce((acc, product) => {
    Object.entries(product.metadata).forEach(([key, value]) => {
      if (relevantFilters.includes(key)) {
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(value);
      }
    });
    return acc;
  }, {} as Record<string, Set<string>>);
  return <div>
    <Filter filters={filters} />
  </div>;
}