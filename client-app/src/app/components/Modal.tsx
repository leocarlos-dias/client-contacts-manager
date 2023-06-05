import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed z-10 inset-0 overflow-hidden" aria-modal="true" role="dialog">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <header className="text-right bg-white px-4 pt-5">
            <button
              onClick={props.onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-stone-400 text-base font-medium text-white hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 sm:w-auto sm:text-sm active:scale-95"
              aria-label="Fechar"
            >
              X
            </button>
          </header>
          <main className="bg-white px-4 pb-4 sm:pb-4">
            <main>
              {props.children}
            </main>
          </main>
        </div>
      </div>
    </div>,
    document.body
  )
};