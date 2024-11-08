'use client'

import React, { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '@/context/AppContext';
import { ActionTypes } from '@/actions';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import ModalWrapper from '../modalWrapper';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

type CheckoutType = {
  priceID: string
}

export default function Checkout({priceID}: CheckoutType) {    
  const {state, dispatch} = useAppContext();    
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!priceID) {
        throw new Error('Price ID is required');
      }

      const response = await fetch("/api/embeded-checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceID,
          timestamp: Date.now(),
          // userId: user?.id,
        })
      })

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      
      return data.clientSecret;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
}, [priceID]);

  const handleCheckoutClick = () => {
    if (!isLoading) {
      dispatch({type: ActionTypes.TOGGLE_CHECKOUT_DIALOG});
    }
  }

  const options = {
    fetchClientSecret,
    onComplete: () => {
      dispatch({type: ActionTypes.TOGGLE_CHECKOUT_DIALOG});
    }
  };

  return (
    <>
      <button 
        onClick={handleCheckoutClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Buy Now'}
      </button>

      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}
      
      {state.isCheckoutOpen &&
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
      }
    </>
  )
}