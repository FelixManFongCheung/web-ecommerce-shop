"use client";

import { createCheckout } from "@/actions/checkout";

export default function CheckoutButton({
  totalPrice,
  disabled,
}: {
  totalPrice: number;
  disabled: boolean;
}) {
  const handleCheckout = async () => {
    try {
      const response = await createCheckout();

      if (!response) throw new Error("Checkout failed");
      if (!response.success) throw new Error("Checkout failed");

      const { url } = response;
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-secondary text-primary py-2"
      disabled={disabled}
    >
      Checkout &mdash; {totalPrice}dkk
    </button>
  );
}

// will i need to use embedded checkout or normal checkout from stripe?`
