import styles from './mobilenav.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import clsx from 'clsx';
import { useAppContext } from '@/context/AppContext';

export default function MobileNav() {
  const {state} = useAppContext();


  return (
    <div className={clsx(styles['mobile-nav-wrapper'], state?.isOpen && styles.open)}>
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
  )
};