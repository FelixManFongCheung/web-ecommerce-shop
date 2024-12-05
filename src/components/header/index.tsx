'use client'

import Link from 'next/link';
import styles from './header.module.scss';
import useAppStore from '@/stores';
import { CartPopup } from '../cartPopup';
import TabsWrapper from '../tabs';
import { CiMenuBurger } from "react-icons/ci";

export default function Header() {
  const store = useAppStore();
  return (
    <>
      <div className={styles.header}>
          <div className='mobile-only'>
            <button className={styles.menu} onClick={store.toggleOpen}>
              <CiMenuBurger />
            </button>
          </div>

          <TabsWrapper>
            <div className={styles.middle}>
              <Link href='/'><strong>proxy archive</strong></Link>
            </div>
          </TabsWrapper>
      </div>
      <CartPopup />
    </>
  )
};