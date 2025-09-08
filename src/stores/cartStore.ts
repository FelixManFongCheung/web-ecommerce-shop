import { CartData } from "@/lib/cart/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import cookiesStorage from "./cartCookies";

export interface CartState {
  products: string[];
  createdAt: string;
  expiresAt: string;
  isExpired: boolean;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  checkExpiry: () => void;
  getCartData: () => CartData | null;
}

const ONE_MONTH = 60 * 60 * 24 * 30; // 30 days in seconds
const CART_EXPIRY_TIME = ONE_MONTH * 1000; // Convert to milliseconds

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
      isExpired: false,

      addProduct: (productId: string) => {
        const state = get();

        if (state.isExpired) {
          set({
            products: [productId],
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
            isExpired: false,
          });
        } else {
          set({
            products: [...state.products, productId],
            // Update expiry time when cart is modified
            expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
          });
        }
      },

      removeProduct: (productId: string) => {
        const state = get();

        if (state.isExpired) {
          return; // Don't modify expired cart
        }

        set({
          products: state.products.filter((id) => id !== productId),
          // Update expiry time when cart is modified
          expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
        });
      },

      clearCart: () => {
        set({
          products: [],
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
          isExpired: false,
        });
      },

      checkExpiry: () => {
        const state = get();
        const now = new Date();
        const expiresAt = new Date(state.expiresAt);
        const isExpired = now >= expiresAt;

        if (isExpired && !state.isExpired) {
          set({
            products: [],
            isExpired: true,
          });
        }

        return isExpired;
      },

      getCartData: () => {
        const state = get();

        console.log(state);

        if (state.isExpired) {
          return null;
        }

        return {
          products: state.products,
          createdAt: state.createdAt,
          expiresAt: state.expiresAt,
        };
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => cookiesStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Check expiry on rehydration
          const now = new Date();
          const expiresAt = new Date(state.expiresAt);
          const isExpired = now >= expiresAt;

          if (isExpired) {
            state.products = [];
            state.isExpired = true;
          }
        }
      },
    }
  )
);

export const useCartProducts = () => useCartStore((state) => state.products);
export const useIsCartExpired = () => useCartStore((state) => state.isExpired);
