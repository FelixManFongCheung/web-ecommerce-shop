"use client";

import { revalidateProductPage } from "@/actions/revalidateProductPage";
import { removeProductFromCartClient } from "@/lib/cart/client";
import { useState } from "react";

interface RemoveItemProps {
  productId: string;
  children?: React.ReactNode;
}

export default function RemoveItem({ productId, children }: RemoveItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemoveFromCart = async () => {
    try {
      removeProductFromCartClient(productId);
      setIsVisible(false);
      await revalidateProductPage(
        `/collections/[collection]/products/[product]/${productId}`
      );
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
