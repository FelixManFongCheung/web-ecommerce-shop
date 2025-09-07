"use client";

import { removeFromCart } from "@/actions/cart";
import { revalidateProductPage } from "@/actions/revalidateProductPage";
import { useState } from "react";

interface RemoveItemProps {
  productId: string;
  children?: React.ReactNode;
}

export default function RemoveItem({ productId, children }: RemoveItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemoveFromCart = async () => {
    try {
      const result = removeFromCart(productId);

      if (result.success) {
        setIsVisible(false);
        await revalidateProductPage(
          `/collections/[collection]/products/[product]/${productId}`
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
      <button onClick={handleRemoveFromCart} className="cursor-pointer ml-2">
        remove this
      </button>
    </div>
  );
}
