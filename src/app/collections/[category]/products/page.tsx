import { getProductsAll } from '../utils/stripe';
import ProductsSection from '@/components/productSection';
import { Suspense } from 'react';

export default async function Page() {
  // Server-side data fetching
  const products = await getProductsAll();
      
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsSection initialProducts={products} />
    </Suspense>
  )
}