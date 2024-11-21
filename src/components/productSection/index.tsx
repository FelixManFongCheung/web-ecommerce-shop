'use client'

import { useEffect, useState } from 'react';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/productCard';
import styles from './productSection.module.scss';
import type Stripe from 'stripe';
import clsx from 'clsx';

interface ClientProductSectionProps {
  initialProducts: Stripe.Product[];
}

export function ClientProductSection({ initialProducts }: ClientProductSectionProps) {
  const setProducts = useProductStore((state) => state.setProducts);
  const filteredProducts = useProductStore((state) => state.filteredProducts);
  const filterOptions = useProductStore((state) => state.filterOptions);
  const selectedFilters = useProductStore((state) => state.selectedFilters);
  const updateFilter = useProductStore((state) => state.updateFilter);
  const resetFilters = useProductStore((state) => state.resetFilters);
  
  // Track which accordions are open
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className={styles['products-container']}>
      <div className={styles.filters}>
        <button 
        onClick={resetFilters} 
        className={styles['reset-button']}
        >
        Reset All
        </button>

        {Object.entries(filterOptions).map(([key, values]) => (
          <div key={key} className={styles.accordion}>
            <button
              className={styles['accordion-header']}
              onClick={() => toggleAccordion(key)}
              aria-expanded={openAccordions[key]}
            >
              <span>{key.charAt(0).toLowerCase() + key.slice(1)}</span>
              <span className={styles.chevron}>
                {openAccordions[key] ? '-' : '+'}
              </span>
            </button>
            
            <div className={clsx(styles['accordion-content'], openAccordions[key] && styles.open)}>
            {values.map((value) => (
                <label 
                onClick={() => updateFilter(key,  selectedFilters[key] === value ? 'all' : value)}
                key={value} 
                className={styles['filter-option']}
                >
                <span>{value}</span>
                </label>
            ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles['products-grid']}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}