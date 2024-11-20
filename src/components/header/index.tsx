'use client'

import Link from 'next/link';
import styles from './header.module.scss';
import useAppStore from '@/stores';
import { CartPopup } from '../cartPopup';
export default function Header() {
  const store = useAppStore();
  return (
    <>
      <div className={styles.header}>
          <div className='mobile-only'>
            <button onClick={store.toggleOpen}>vbjdfvhbdfbjv</button>
          </div>
          <div className={styles.left}>
              <Link href='/'>Home</Link>
              <Link href='/products'>Products</Link>
              <Link href='/about'>About</Link>
              <Link href='/contact'>Contact</Link>
          </div>
          <div className={styles.right}>
            <Link href="/search">Search</Link>
            <Link href='/cart'>Cart</Link>
          </div>
      </div>
      <CartPopup />
    </>
  )
};