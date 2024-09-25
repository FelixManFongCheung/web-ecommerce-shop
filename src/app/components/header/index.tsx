import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
        <Link href={'/products'}>Link 1</Link>
        <Link href={'/products'}>Link 2</Link>
        <Link href={'/products'}>Link 3</Link>
    </div>
  )
};