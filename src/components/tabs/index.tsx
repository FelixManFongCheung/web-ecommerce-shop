import React from 'react';
import styles from './tabs.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import useAppStore from '@/stores';

export default function TabsWrapper({children, isMobile}: {children?: React.ReactNode, isMobile?: boolean}) {    
    const store = useAppStore();
    
    const handleLinkClick = () => {
        if (isMobile) {
            store.toggleOpen();
        }
    };

    return (
        <>
            <div className={clsx(styles.left, isMobile && styles.mobile)}>
                <Link href='/collections/all' onClick={handleLinkClick}>shop</Link>
                <Link href='/archive' onClick={handleLinkClick}>archive</Link>
                <Link href='/about' onClick={handleLinkClick}>about</Link>
                <Link href='/visit' onClick={handleLinkClick}>visit us</Link>
            </div>

            {children}

            <div className={clsx(styles.right, isMobile && styles.mobile)}>
                <Link href="/contact" onClick={handleLinkClick}>contact</Link>
                <Link href="/search" onClick={handleLinkClick}>search</Link>
                <Link href='/cart' onClick={handleLinkClick}>cart</Link>
            </div>
        </>
    );
}