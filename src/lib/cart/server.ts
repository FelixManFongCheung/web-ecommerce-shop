import { CartState } from "@/stores/cartStore";
import { cookies } from "next/headers";
import { CartData, CartResponse } from "./type";

export async function getCartFromCookie(): Promise<CartData | null> {
  try {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cart-storage");

    if (!cartCookie) return null;

    const { state: cartData } = JSON.parse(cartCookie.value) as {
      state: CartState;
    };

    // Check if cart has expired
    if (new Date(cartData.expiresAt) < new Date()) {
      return null;
    }

    return cartData;
  } catch (error) {
    console.error("Error reading cart from cookie:", error);
    return null;
  }
}

export async function setCartCookie(cartData: CartData): Promise<void> {
  const ONE_MONTH = 60 * 60 * 24 * 30; // 30 days

  const cookieStore = await cookies();
  cookieStore.set("cart-storage", JSON.stringify(cartData), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_MONTH,
    httpOnly: true,
  });
}

export async function addProductToCart(
  productId: string
): Promise<CartResponse> {
  try {
    const existingCart = await getCartFromCookie();
    const ONE_MONTH = 60 * 60 * 24 * 30;
    const expiresAt = new Date(Date.now() + ONE_MONTH * 1000).toISOString();

    let updatedProducts: string[];

    if (existingCart) {
      // Add to existing cart
      updatedProducts = [...existingCart.products, productId];
    } else {
      // Create new cart
      updatedProducts = [productId];
    }

    const cartData: CartData = {
      products: updatedProducts,
      createdAt: existingCart?.createdAt || new Date().toISOString(),
      expiresAt,
    };

    await setCartCookie(cartData);

    return {
      success: true,
      message: existingCart
        ? "Cart updated successfully!"
        : "Cart created successfully!",
      cartID: "cookie-based-cart", // For compatibility
    };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function removeProductFromCart(
  productId: string
): Promise<CartResponse> {
  try {
    const existingCart = await getCartFromCookie();

    if (!existingCart) {
      return {
        success: false,
        error: "No cart found",
      };
    }

    const updatedProducts = existingCart.products.filter(
      (id) => id !== productId
    );

    if (updatedProducts.length === 0) {
      // Remove cart cookie if empty
      const cookieStore = await cookies();
      cookieStore.delete("cart-storage");
    } else {
      const cartData: CartData = {
        ...existingCart,
        products: updatedProducts,
      };
      await setCartCookie(cartData);
    }

    return {
      success: true,
      message: "Product removed from cart successfully!",
    };
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
