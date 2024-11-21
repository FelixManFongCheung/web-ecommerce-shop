'use client'

import { useEffect, useState, useRef } from 'react';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/productCard';
import styles from './productSection.module.scss';
import type Stripe from 'stripe';

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

  const accordionRefs = useRef<Record<string, HTMLDivElement | null>>({});


  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {    
    Object.entries(openAccordions).forEach(([key, value]) => {
        const element = accordionRefs.current[key];        
        if (value && element) {
            const fullHeight = element.scrollHeight;
            element.style.cssText = `height: ${fullHeight}px; overflow: hidden;`;
        } else if (element) {
            element.style.cssText = `height: 0; overflow: hidden;`;
        }
    });
  }, [openAccordions]);

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
            
            <div 
                style={{ height: '0', overflow: 'hidden' }}
                className={styles['accordion-content']}
                ref={el => { accordionRefs.current[key] = el }}
            >
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