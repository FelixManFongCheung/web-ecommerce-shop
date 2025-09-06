import { useAppActions } from "@/stores/appStore";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleCheckoutDialog } = useAppActions();
  return (
    <>
      <div
        onClick={toggleCheckoutDialog}
        className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-99"
      />
      <dialog
        className="absolute top-1/2 left-1/2 w-fit h-[80vh] overflow-scroll border border-gray-500 transform -translate-x-1/2 -translate-y-[80%] z-99"
        open
      >
        {children}
      </dialog>
    </>
  );
}
