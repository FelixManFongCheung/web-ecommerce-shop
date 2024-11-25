import { getProductsAll } from '@/app/utils/stripe';
import ProductsSection from '@/components/productSection';
import { Suspense } from 'react';
import { searchProducts } from '@/app/utils/stripe';
import Stripe from 'stripe';
import Link from 'next/dist/client/link';
import ProductCard from '@/components/productCard';
export default async function Page({ params }: { params: { collection: string } }) {
  // Server-side data fetching
  let products: Stripe.Product[] | undefined = await getProductsAll();
  let filterName;
  const relevantFilters = ['categories', 'designers'];
  const filters = products.reduce((acc, product) => {
    Object.entries(product.metadata).forEach(([key, value]) => {
      if (relevantFilters.includes(key)) {
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(value);
        console.log(decodeURIComponent(params.collection) );
        
        if (value === decodeURIComponent(params.collection)) filterName = key;
      }
    });
    return acc;
  }, {} as Record<string, Set<string>>);

  if (params.collection !== 'all') {
    const searchResult = await searchProducts('', { 
      metadataName: filterName, 
      metadataQuery: decodeURIComponent(params.collection) 
    });
    products = searchResult.products;
  } 

  console.log({ metadataName: filterName , metadataQuery: params.collection });  
      
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        {Object.entries(filters).map(([key, values]) => (
          <div key={key}>
          <h3>{key}</h3>
          {Array.from(values).map(value => <Link href={`/collections/${value}`} key={value}>{value}</Link>)}
        </div>
        ))}
        {products? 
        products.map(product => <ProductCard key={product.id} product={product} />)
        : <div>No products found</div>}
      </section>
    </Suspense>
  )
}