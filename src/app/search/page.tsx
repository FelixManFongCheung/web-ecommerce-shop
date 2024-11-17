'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useDebounce } from 'use-debounce';
import { searchProducts } from '../utils/getProducts';
import Stripe from 'stripe';
import styles from './page.module.scss';

const SearchResults = ({search}: {search: string}) => {
  const router = useRouter();
  const [debouncedValue] = useDebounce(search, 500);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Stripe.Product[]>([]);

  // Debounced search effect
  useEffect(() => {
    const performSearch = async () => {
      try {
        // Update URL
        const params = new URLSearchParams(searchParams);
        if (debouncedValue) {
          params.set('q', debouncedValue);
        } else {
          params.delete('q');
        }
        router.replace(`?${params.toString()}`);

        // Use server action directly
        const { products: searchResults } = await searchProducts(debouncedValue);        
        setProducts(searchResults || []);
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    performSearch();
  }, [debouncedValue, router, searchParams]);

  return (
    <div>
    {products ? (products.map((product) => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      ))) : (<div>No products found</div>)}
    </div>
  )
}

export default function Page() {
  const [search, setSearch] = useState('');


  // Handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };


  return (
    <section className={styles.search}>
      <input
        className={styles['search-input']}
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <Suspense fallback={<div>Loading products...</div>}>
        <SearchResults search={search} />
      </Suspense>
    </section>
  );
}