'use client'

import { v7 as uuidv7 } from 'uuid';
import { getCookie } from 'cookies-next';
import styles from './atc.module.scss';
import {useState} from 'react';

interface ATCProp {
    productId: string;
    isATC: boolean
}

export default function ATC({productId, isATC}: ATCProp) {  
    const [ATCState, setATCState] = useState(isATC)
    const cartCookies = getCookie('cart');

    const addToCart = async () => {
        let identifier: string;
        setATCState(true);
        if (getCookie('cart')) {
            identifier = cartCookies as string;
        } else {
            identifier = uuidv7();
        }

        await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                identifier: identifier, 
                products: productId
            }), 
        })
    }
    return (
        <button disabled={ATCState} className={styles['atc-btn']} onClick={addToCart}>Add to cart</button>
    )
};