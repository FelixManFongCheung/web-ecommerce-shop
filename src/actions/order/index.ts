"use server";

import { getCartFromCookie, setCartCookie } from "@/lib/cart/server";
import { cookies } from "next/headers";
import { retrieveSession, updateProduct } from "../stripe";

export async function completeOrder(sessionId: string) {
  try {
    // 1. Retrieve the session with line items
    const session = await retrieveSession(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    const currentCart = await getCartFromCookie();

    if (currentCart?.products) {
      const lineItems = session.line_items?.data;
      const priceIds = lineItems?.map((item) =>
        typeof item.price?.product === "string"
          ? item.price.product
          : item.price?.product.id
      );

      const updatedProducts = currentCart.products.filter(
        (id: string) => !priceIds!.includes(id)
      );

      // Update cart with remaining products
      if (updatedProducts.length > 0) {
        const updatedCart = {
          ...currentCart,
          products: updatedProducts,
        };
        await setCartCookie(updatedCart);
      } else {
        // Remove cart if empty
        const cookieStore = await cookies();
        cookieStore.delete("cart");
      }
    }

    // 2. Process each purchased item
    for (const item of session.line_items?.data || []) {
      const productId =
        typeof item.price?.product === "string"
          ? item.price.product
          : item.price?.product.id;

      // Deactivate the product after purchase
      // TODO: remember to fetch products based on matadata sold for the cross img on top of image
      await updateProduct(productId as string, {
        active: false,
        metadata: {
          sold: "true",
          sold_at: new Date().toISOString(),
          session_id: sessionId,
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error processing order:", error);
    throw new Error("Failed to process order");
  }
}

export async function cancelOrder(sessionId: string) {
  console.log(sessionId);
}
