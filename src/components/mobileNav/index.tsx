'use client'

import styles from './mobilenav.module.scss';
import clsx from 'clsx';
import useAppStore from '@/stores';
import TabsWrapper from '../tabs';

export default function MobileNav() {
  const store = useAppStore();

  return (
    <div className={clsx(styles['mobile-nav-wrapper'], store.isOpen && styles.open)}>
      <div className={styles['mobile-nav-backdrop']} onClick={store.toggleOpen}></div>
      <div className={styles['mobile-nav-content']}>
        <TabsWrapper isMobile={true} />
      </div>
    </div>
  )
};