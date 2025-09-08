"use client";

import { useCartStore } from "@/stores/cartStore";

export function getCartFromCookieClient(): string[] {
  const state = useCartStore.getState().products;
  return state;
}

export function addProductToCartClient(productId: string): void {
  useCartStore.getState().addProduct(productId);
}

export function removeProductFromCartClient(productId: string): void {
  const state = useCartStore.getState();
  console.log(state);
  useCartStore.getState().removeProduct(productId);
}

export function useCartClient() {
  const store = useCartStore();

  return {
    products: store.products,
    isExpired: store.isExpired,
    addProduct: store.addProduct,
    removeProduct: store.removeProduct,
    clearCart: store.clearCart,
    checkExpiry: store.checkExpiry,
    getCartData: store.getCartData,
  };
}
