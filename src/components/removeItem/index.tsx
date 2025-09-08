"use client";

import { revalidateProductPage } from "@/actions/revalidateProductPage";
import { cn } from "@/lib/utils";
import { useCartActions } from "@/stores/cartStore";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const { removeProduct } = useCartActions();
  const handleRemoveFromCart = async () => {
    try {
      removeProduct(productId);
      await revalidateProductPage(pathname);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className={cn(className)}>
      {children}
      <button onClick={handleRemoveFromCart} className="cursor-pointer ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
