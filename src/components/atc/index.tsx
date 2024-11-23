'use client'

import { v7 as uuidv7 } from 'uuid';
import { getCookie } from 'cookies-next';
import styles from './atc.module.scss';
import {useState} from 'react';
import { clsx } from 'clsx';
import useAppStore, { AppState } from '@/stores';
import Stripe from 'stripe';

interface ATCProp {
    product: Stripe.Product;
    isATC: boolean
}
import { addToCart } from '@/app/utils/cart';

export default function ATC({product, isATC}: ATCProp) {  
    const [ATCState, setATCState] = useState(isATC)
    const cartCookies = getCookie('cart');

    const openCart = useAppStore((state: AppState) => state.openCart)

    const addToCartAction = async () => {
        let identifier: string;        
        setATCState(true);
        if (cartCookies) {
            identifier = cartCookies as string;
        } else {
            identifier = uuidv7();
        }

        await addToCart(identifier, product);
        
        openCart();
    }
    return (
        <button disabled={ATCState} className={clsx(styles['atc-btn'], ATCState && styles['atc-btn-disabled'])} onClick={addToCartAction}>Add to cart</button>
    )
};