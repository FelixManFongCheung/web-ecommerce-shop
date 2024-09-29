import styles from './mobilenav.module.scss';
import Link from 'next/link';
import { ActionTypes } from '@/actions';
import clsx from 'clsx';
import { useAppContext } from '@/context/AppContext';

export default function MobileNav() {
  const {state, dispatch} = useAppContext();


  return (
    <div className={clsx(styles['mobile-nav-wrapper'], state?.isOpen && styles.open)}>
      <div className={styles['mobile-nav-backdrop']} onClick={()=>dispatch({type: ActionTypes.TOGGLE_OPEN})}></div>
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