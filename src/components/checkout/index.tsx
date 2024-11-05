'use client'

import React, { useCallback } from 'react';
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

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/embeded-checkout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({priceId: priceID})
    })
    const data = await response.json();
    return data.clientSecret;
}, [priceID]);

  const options = {fetchClientSecret};

  return (
    <>
      <button onClick={()=>{dispatch({type: ActionTypes.TOGGLE_CHECKOUT_DIALOG})}}>
        buy now
      </button>
      {state.isCheckoutOpen &&
        <ModalWrapper>
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={options}
            >
              {state.isCheckoutOpen}
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </ModalWrapper>
      }
    </>
  )
}