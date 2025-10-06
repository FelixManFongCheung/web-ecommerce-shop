"use client";

import { cn } from "@/lib/utils";
import { useCartActions } from "@/stores/cartStore";
import { X } from "lucide-react";

interface RemoveItemProps {
  productId: string;
  children?: React.ReactNode;
  className?: string;
}

export default function RemoveItem({
  productId,
  children,
  className,
}: RemoveItemProps) {
  const { removeProduct } = useCartActions();
  const handleRemoveFromCart = async () => {
    try {
      removeProduct(productId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className={cn(className)}>
      {children}
      <button onClick={handleRemoveFromCart} className="cursor-pointer ml-2">
        <X className="w-2 h-2" />
      </button>
    </div>
  );
}
