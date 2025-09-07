// app/actions/cart.ts
"use server";

import { addProductToCart } from "@/lib/cart/utils";
import { revalidatePath } from "next/cache";

type CartResponse = {
  success: boolean;
  message?: string;
  error?: string;
  cartID?: string;
};

export async function addToCart(
  identifier: string,
  productId: string
): Promise<CartResponse> {
  try {
    const result = await addProductToCart(productId);

    if (result.success) {
      // Revalidate after successful update
      revalidatePath("/cart");
    }

    return result;
  } catch (error) {
    console.error("Cart action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
