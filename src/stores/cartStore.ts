import { CartData } from "@/lib/cart/type";
import { setCookie } from "cookies-next";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface CartState {
  products: string[];
  createdAt: string;
  expiresAt: string;
  isExpired: boolean;
}

export interface CartActions {
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  checkExpiry: () => void;
  getCartData: () => CartData | null;
}

const ONE_MONTH = 60 * 60 * 24 * 30; // 30 days in seconds
const CART_EXPIRY_TIME = ONE_MONTH * 1000; // Convert to milliseconds

export const useCartStore = create<CartState & { actions: CartActions }>()(
  devtools((set, get) => ({
    // Initial state
    products: [],
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
    isExpired: false,

    actions: {
      addProduct: (productId: string) => {
        const state = get();

        if (state.isExpired) {
          const newState = {
            products: [productId],
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
            isExpired: false,
          };
          set(newState);
          setCookie("cart-storage", JSON.stringify({ state: newState }), {
            expires: new Date(Date.now() + CART_EXPIRY_TIME),
          });
        } else {
          const newState = {
            ...state,
            products: [...state.products, productId],
            expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
          };
          set(newState);
          setCookie("cart-storage", JSON.stringify({ state: newState }), {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          });
        }
      },

      removeProduct: (productId: string) => {
        const state = get();

        if (state.isExpired) {
          return; // Don't modify expired cart
        }

        const newState = {
          ...state,
          products: state.products.filter((id) => id !== productId),
          expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
        };
        set(newState);
        setCookie("cart-storage", JSON.stringify({ state: newState }), {
          expires: new Date(Date.now() + CART_EXPIRY_TIME),
        });
      },

      clearCart: () => {
        const newState = {
          products: [],
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + CART_EXPIRY_TIME).toISOString(),
          isExpired: false,
        };
        set(newState);
        setCookie("cart-storage", JSON.stringify({ state: newState }), {
          expires: new Date(Date.now() + CART_EXPIRY_TIME),
        });
      },

      checkExpiry: () => {
        const state = get();
        const now = new Date();
        const expiresAt = new Date(state.expiresAt);
        const isExpired = now >= expiresAt;

        if (isExpired && !state.isExpired) {
          const newState = {
            ...state,
            products: [],
            isExpired: true,
          };
          set(newState);

          setCookie("cart-storage", JSON.stringify({ state: newState }), {
            expires: new Date(Date.now() + CART_EXPIRY_TIME),
          });
        }

        return isExpired;
      },

      getCartData: () => {
        const state = get();

        if (state.isExpired) {
          return null;
        }

        return {
          products: state.products,
          createdAt: state.createdAt,
          expiresAt: state.expiresAt,
        };
      },
    },
  }))
);

export const useCartProducts = () => useCartStore((state) => state.products);
export const useCartActions = () => useCartStore((state) => state.actions);
export const useIsCartExpired = () => useCartStore((state) => state.isExpired);
