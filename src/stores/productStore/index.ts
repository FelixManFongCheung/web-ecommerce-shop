import { create } from 'zustand';
import type Stripe from 'stripe';

interface ProductState {
  products: Stripe.Product[];
  filteredProducts: Stripe.Product[];
  filterOptions: Record<string, string[]>;
  selectedFilters: Record<string, string>;
  setProducts: (products: Stripe.Product[]) => void;
  updateFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  filteredProducts: [],
  filterOptions: {},
  selectedFilters: {},

  setProducts: (products) => {
    const relevantFilters = ['categories', 'designers'];
    const filters = products.reduce((acc, product) => {
      Object.entries(product.metadata).forEach(([key, value]) => {
        if (relevantFilters.includes(key)) {
          if (!acc[key]) acc[key] = new Set();
          acc[key].add(value);
        }
      });
      return acc;
    }, {} as Record<string, Set<string>>);

    const options = Object.entries(filters).reduce((acc, [key, values]) => {
      acc[key] = Array.from(values);
      return acc;
    }, {} as Record<string, string[]>);

    set({ 
      products, 
      filteredProducts: products,
      filterOptions: options 
    });
  },

  updateFilter: (key: string, value: string) => {
    set((state) => {
      const newFilters = {
        ...state.selectedFilters,
        [key]: value === 'all' ? '' : value
      };

      const filtered = state.products.filter(product => 
        Object.entries(newFilters).every(([filterKey, filterValue]) => {
          if (!filterValue) return true;
          return product.metadata[filterKey] === filterValue;
        })
      );

      return {
        selectedFilters: newFilters,
        filteredProducts: filtered
      };
    });
  },

  resetFilters: () => set((state) => ({ 
    selectedFilters: {},
    filteredProducts: state.products 
  })),
}));