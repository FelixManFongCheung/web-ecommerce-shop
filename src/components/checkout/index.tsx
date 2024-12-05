'use client'

import React, { useCallback, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useAppStore from '@/stores';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import ModalWrapper from '../modalWrapper';
import styles from './checkout.module.scss';
import clsx from 'clsx';
import { createEmbeddedCheckout } from '@/utils/checkout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

type CheckoutType = {
  priceID: string
}

export default function Checkout({priceID}: CheckoutType) {   
  const store = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!priceID) {
        throw new Error('Price ID is required');
      }

      const response = await createEmbeddedCheckout(priceID);

      if (!response.success) {
        const error = response.error;
        throw new Error(error);
      }

      const data = response.data;
      
      return data!.clientSecret;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [priceID]);

  useEffect(() => {
    fetchClientSecret()
      .then(secret => setClientSecret(secret))
      .catch(() => {}); // Error is already handled in fetchClientSecret
  }, [fetchClientSecret]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  }

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  }

  const options = {
    clientSecret,
    onComplete: () => store.toggleCheckoutDialog()
  };

  return (
    <>
      <div className={clsx(styles['smoke-screen'], isMouseOver && styles.blur)}></div>
      <button 
        onClick={store.toggleCheckoutDialog}
        disabled={isLoading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles['buy-now-button']}
      >
        {isLoading ? 'Loading...' : 'Buy Now'}
      </button>

      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}
      
      {store.isCheckoutOpen && clientSecret && (
        <ModalWrapper>
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={options}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}