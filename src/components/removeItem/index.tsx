"use client";

import { revalidateProductPage } from "@/actions/revalidateProductPage";
import { removeProductFromCartClient } from "@/lib/cart/client";
import { cn } from "@/lib/utils";
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
  const handleRemoveFromCart = async () => {
    try {
      setTimeout(() => {
        removeProductFromCartClient(productId);
      }, 1000);
      console.log(pathname);
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
