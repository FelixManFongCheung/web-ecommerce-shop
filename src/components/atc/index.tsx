'use client'

import { v7 as uuidv7 } from 'uuid';
import { getCookie } from 'cookies-next';
import styles from './atc.module.scss';
import {useState} from 'react';
import { clsx } from 'clsx';
import useAppStore, { AppState } from '@/stores';
import { addToCart } from '@/utils/cart';

interface ATCProp {
    productId: string,
    isATC: boolean
}

export default function ATC({productId, isATC}: ATCProp) {  
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

        await addToCart(identifier, productId);
        
        openCart();
    }
    return (
        <button disabled={ATCState} className={clsx(styles['atc-btn'], ATCState && styles['atc-btn-disabled'])} onClick={addToCartAction}>Add to cart</button>
    )
};