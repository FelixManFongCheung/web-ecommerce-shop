"use client";

import { createCheckout } from "@/actions/checkout";

export default function CheckoutButton({ cartID }: { cartID: string }) {
  const handleCheckout = async () => {
    try {
      const response = await createCheckout(cartID);

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
    <button className={""} onClick={handleCheckout}>
      Checkout
    </button>
  );
}

// will i need to use embedded checkout or normal checkout from stripe?`
