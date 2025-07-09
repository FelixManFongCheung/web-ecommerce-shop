import { useAppActions } from "@/stores";
import styles from "./modal.module.scss";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleCheckoutDialog } = useAppActions();
  return (
    <>
      <div onClick={toggleCheckoutDialog} className={styles.backdrop} />
      <dialog className={styles["modal-wrapper"]} open>
        {children}
      </dialog>
    </>
  );
}
