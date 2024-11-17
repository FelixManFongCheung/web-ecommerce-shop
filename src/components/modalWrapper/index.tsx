import styles from './modal.module.scss';
import useAppStore from '@/stores';

export default function ModalWrapper({children}: {children: React.ReactNode}) {
  const store = useAppStore();
  return (
    <>
      <div onClick={store.toggleCheckoutDialog} className={styles.backdrop}/>
      <dialog className={styles['modal-wrapper']} open>{children}</dialog>
    </>
  )
};