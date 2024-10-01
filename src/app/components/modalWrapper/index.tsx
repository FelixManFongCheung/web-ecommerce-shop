import styles from './modal.module.scss';
import { AppContext, useAppContext } from '@/context/AppContext';
import { ActionTypes } from '@/actions';

export default function ModalWrapper({children, open}: {children: React.ReactNode, open: boolean}) {
  const {dispatch} = useAppContext();
  
  return (
    <>
      <div onClick={()=>{dispatch({type: ActionTypes.TOGGLE_CHECKOUT_DIALOG})}} className={styles.backdrop}/>
      <dialog className={styles['modal-wrapper']} open>{children}</dialog>
    </>
  )
};