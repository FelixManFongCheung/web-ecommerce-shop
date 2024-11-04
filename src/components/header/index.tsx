'use client'

import Link from 'next/link';
import styles from './header.module.scss';
import { ActionTypes } from '@/actions';
import { useAppContext } from '@/context/AppContext';

export default function Header() {
  const {dispatch} = useAppContext();
  return (
    <div className={styles.header}>
        <div className='mobile-only'>
          <button onClick={() => {dispatch({type: ActionTypes.TOGGLE_OPEN})}}>vbjdfvhbdfbjv</button>
        </div>
        <div className={styles.left}>
            <Link href='/'>home</Link>
            <Link href='/products'>Link 1</Link>
            <Link href='/products'>Link 2</Link>
            <Link href='/products'>Link 3</Link>
        </div>
        <div className={styles.right}>
            <div>search</div>
            <Link href='/cart'>cart</Link>
        </div>
    </div>
  )
};