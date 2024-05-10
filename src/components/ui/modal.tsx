"use client";

import React from "react";
import cn from "@/utils/cn";

type ModalContextValue = {
  modalRef: React.RefObject<HTMLDialogElement>;
};
type ModalProps = React.DialogHTMLAttributes<HTMLDialogElement>;

const ModalContext = React.createContext<ModalContextValue>(
  {} as ModalContextValue
);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  return (
    <ModalContext.Provider value={{ modalRef }}>
      {children}
    </ModalContext.Provider>
  );
};

const Modal = ({ className, children, ...props }: ModalProps) => {
  const { modalRef } = React.useContext(ModalContext);

  React.useEffect(() => {
    if (modalRef.current === null) return;
    const modal = modalRef.current;
    function handleClose() {
      document.body.classList.remove(
        "pr-[17px]",
        "h-screen",
        "overflow-y-hidden"
      );
    }
    modal.addEventListener("close", handleClose);
    return () => modal.removeEventListener("close", handleClose);
  }, [modalRef]);

  return (
    <dialog
      {...props}
      ref={modalRef}
      className="w-full h-full max-w-none max-h-none m-0 p-0 grid fixed items-center justify-items-center inset-0 bg-transparent backdrop:bg-black/40 opacity-0 invisible pointer-events-none open:visible open:opacity-100 open:pointer-events-auto duration-150"
    >
      <div
        className={cn(
          "max-w-sm bg-white p-6 rounded-lg",
          className,
          "w-11/12 max-h-[calc(100vh-5rem)] overflow-y-auto"
        )}
      >
        {children}
      </div>
    </dialog>
  );
};

const ModalOpenButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const { modalRef } = React.useContext(ModalContext);

  const handleOpen = (props.onClick = () => {
    if (modalRef.current?.open) return;
    document.body.classList.add("pr-[17px]", "h-screen", "overflow-y-hidden");
    modalRef?.current?.showModal();
  });

  if (asChild && React.isValidElement(children)) {
    props.onClick = (e) => {
      handleOpen();
      children.props.onClick?.(e);
    };
    return React.cloneElement(children, { ...children.props, ...props });
  }

  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
ModalOpenButton.displayName = "ModalOpenButton";

const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const { modalRef } = React.useContext(ModalContext);

  const handleClose = (props.onClick = () => {
    if (!modalRef.current?.open) return;
    modalRef?.current?.close();
  });

  if (asChild && React.isValidElement(children)) {
    props.onClick = (e) => {
      handleClose();
      children.props.onClick?.(e);
    };
    return React.cloneElement(children, { ...children.props, ...props });
  }

  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
ModalCloseButton.displayName = "ModalCloseButton";

export { Modal, ModalProvider, ModalOpenButton, ModalCloseButton };
export default Modal;
