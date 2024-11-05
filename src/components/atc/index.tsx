'use client'

import { v7 as uuidv7 } from 'uuid';
import { getCookie } from 'cookies-next';
import styles from './atc.module.scss';
import {useState, useEffect} from 'react';

interface ATCProp {
    productId: string;
}

export default function ATC({productId}: ATCProp) {    
    const cartCookies = getCookie('cart');
    const [atcBtn, setAtcBtn] = useState(false);
  
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`/api/cart/${productId}`);
                const {isProductInCart} = await response.json();
                if (isProductInCart) {
                    setAtcBtn(true);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };

        fetchCart();
    }, [productId]);


    const addToCart = async () => {
        let identifier: string;

        setAtcBtn(!atcBtn);

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
        <button disabled={atcBtn ? true : false} className={styles['atc-btn']} onClick={addToCart}>Add to cart</button>
    )
};