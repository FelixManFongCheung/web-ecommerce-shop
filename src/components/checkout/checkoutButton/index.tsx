"use client";

import { createCheckout } from "@/actions/checkout";

export default function CheckoutButton({
  totalPrice,
  disabled,
  currency,
}: {
  totalPrice: number;
  disabled: boolean;
  currency: string;
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
      className="w-full bg-secondary text-primary py-[0.4rem] md:py-[0.5rem] text-[0.5rem] md:text-[0.7rem]"
      disabled={disabled}
    >
      CHECKOUT &mdash; {totalPrice} {currency.toUpperCase()}
    </button>
  );
}

// will i need to use embedded checkout or normal checkout from stripe?`
