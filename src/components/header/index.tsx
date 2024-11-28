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
              <Link href='/collections/all'>shop</Link>
              <Link href='/archive'>archive</Link>
              <Link href='/about'>about</Link>
              <Link href='/visit'>visit us</Link>
          </div>
          <div className={styles.middle}>
            <Link href='/'><strong>proxy archive</strong></Link>
          </div>
          <div className={styles.right}>
            <Link href="/contact">contact</Link>
            <Link href="/search">search</Link>
            <Link href='/cart'>cart</Link>
          </div>
      </div>
      <CartPopup />
    </>
  )
};