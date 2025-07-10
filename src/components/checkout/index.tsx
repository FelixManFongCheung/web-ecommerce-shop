"use client";

import { ModalWrapper } from "@/components";
import { cn } from "@/lib/utils";
import { useAppActions, useIsCheckoutOpen } from "@/stores";
import { createEmbeddedCheckout } from "@/utils/checkout";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";
import CheckoutButton from "./checkoutButton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type CheckoutType = {
  priceID: string;
};

export function Checkout({ priceID }: CheckoutType) {
  const { toggleCheckoutDialog } = useAppActions();
  const isCheckoutOpen = useIsCheckoutOpen();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!priceID) {
        throw new Error("Price ID is required");
      }

      const response = await createEmbeddedCheckout(priceID);

      if (!response.success) {
        const error = response.error;
        throw new Error(error);
      }

      const data = response.data;

      return data!.clientSecret;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [priceID]);

  useEffect(() => {
    fetchClientSecret()
      .then((secret) => setClientSecret(secret))
      .catch(() => {}); // Error is already handled in fetchClientSecret
  }, [fetchClientSecret]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const options = {
    clientSecret,
    onComplete: toggleCheckoutDialog,
  };

  return (
    <>
      <div className={cn("smoke-screen", isMouseOver && "")}></div>
      <button
        onClick={toggleCheckoutDialog}
        disabled={isLoading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={"buy-now-button"}
      >
        {isLoading ? "Loading..." : "Buy Now"}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {isCheckoutOpen && clientSecret && (
        <ModalWrapper>
          <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </ModalWrapper>
      )}
    </>
  );
}

export { CheckoutButton };
