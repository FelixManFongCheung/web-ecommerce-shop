"use client";

import { revalidateProductPage } from "@/actions/revalidateProductPage";
import { removeProductFromCart } from "@/lib/cart/utils";
import { useState } from "react";

interface RemoveItemProps {
  cartID: string;
  productId: string;
  children?: React.ReactNode;
}

export default function RemoveItem({
  cartID,
  productId,
  children,
}: RemoveItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  const removeFromCart = async () => {
    try {
      const result = await removeProductFromCart(productId);

      if (result.success) {
        setIsVisible(false);
        await revalidateProductPage(
          "/collections/[collection]/products/[product]"
        );
      } else {
        console.error("Error removing item:", result.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={isVisible ? "" : ""}>
      {children}
      <button onClick={removeFromCart} className="cursor-pointer ml-2">
        remove this
      </button>
    </div>
  );
}
