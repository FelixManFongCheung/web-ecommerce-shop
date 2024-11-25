import { getProductsAll } from '@/app/utils/stripe';
import { Suspense } from 'react';
import { searchProducts } from '@/app/utils/stripe';
import Stripe from 'stripe';
import Link from 'next/dist/client/link';
import ProductCard from '@/components/productCard';
import ProductCardSkeleton from '@/components/productSkeleton';
import styles from './page.module.scss';

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
      
  return (
    <section className={styles.collection}>
      <div className={styles.filter}>
        {Object.entries(filters).map(([key, values]) => (
          <div className={styles['filter-group']} key={key}>
            <Link href={'/collections/all'}>all</Link>
            <h3 className={styles.category}>{key}</h3>
            {Array.from(values).map(value => <Link href={`/collections/${value}`} className={styles['filter-name']} key={value}>{value}</Link>)}
          </div>
        ))}
      </div>
      <div className={styles['products-grid']}>
        {products ? 
          products.map(product => (
            <Suspense 
              key={product.id} 
              fallback={<ProductCardSkeleton />}
            >
              <ProductCard product={product} />
            </Suspense>
          ))
          : <div>No products found</div>
        }
      </div>
    </section>
  )
}