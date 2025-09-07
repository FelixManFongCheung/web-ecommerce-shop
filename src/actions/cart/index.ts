// app/actions/cart.ts
"use server";

import {
  addProductToCartClient,
  removeProductFromCartClient,
} from "@/lib/cart/client";
import { CartResponse } from "@/lib/cart/type";

export function addToCart(identifier: string, productId: string): CartResponse {
  try {
    addProductToCartClient(productId);

    return {
      success: true,
      message: "Product added to cart successfully!",
    };
  } catch (error) {
    console.error("Cart action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export function removeFromCart(productId: string): CartResponse {
  try {
    removeProductFromCartClient(productId);

    return {
      success: true,
      message: "Product removed from cart successfully!",
    };
  } catch (error) {
    console.error("Cart action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
