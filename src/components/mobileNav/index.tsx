'use client'

import styles from './mobilenav.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import useAppStore from '@/stores';

export default function MobileNav() {
  const store = useAppStore();

  return (
    <div className={clsx(styles['mobile-nav-wrapper'], store.isOpen && styles.open)}>
      <div className={styles['mobile-nav-backdrop']} onClick={store.toggleOpen}></div>
      <div className={styles['mobile-nav-content']}>
        <ul>
            <li>
              <Link href='/product'>Products</Link>
            </li>
            <li>
              <Link href='/product'>Products</Link>
            </li>
            <li>
              <Link href='/product'>Products</Link>
            </li>
        </ul>
      </div>
    </div>
  )
};