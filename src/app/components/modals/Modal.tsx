'use client';

import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import useClickOutside from '@/app/hooks/useClickOutside';

type ModalProps = {
    isOpen?: boolean,
    onOpen: (isOpen: boolean) => void,
    onClose: () => void,
    onSubmit: () => void,
    title?: string,
    body?: React.ReactElement | (() => React.ReactNode),
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction?: () => void,
    secondaryActionLabel?: string,
    additionalRefs?: RefObject<HTMLElement>[]
 }

const Modal = ({ 
    isOpen, 
    onOpen,
    onClose, 
    onSubmit, 
    title, 
    body, 
    footer, 
    actionLabel, 
    disabled,
    secondaryAction,
    secondaryActionLabel,
    additionalRefs = [],
 }: ModalProps) => {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
      if (disabled) {
        return;
      }

      onOpen(false);

      setTimeout(() => {
        onClose();
      }, 300)
  }, [disabled, onClose, onOpen]);

    useClickOutside([modalRef, ...additionalRefs], handleClose);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction= useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if(!isOpen) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus-visible:ring bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
        <div className={
          `translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`
        }>
          <div ref={modalRef} className="relative translate h-full md:h-auto border-0 rounded-lg shadow-lg flex flex-col w-full outline-none focus-visible:ring bg-background">
              <div className="relative flex items-center p-6 rounded-t justify-center border-b-[1px] shadow:sm">
                <button 
                  className="absolute p-1 hover:opacity-70 transition right-9"
                  onClick={handleClose}>
                  <IoMdClose size={18} />
                </button>
                <p className="text-lg font-semibold">
                  {title}
                </p>   
              </div>
              <div className="flex flex-col gap-5 p-6">
                <div className="relative">
                  {body && (typeof body === 'function' ? body() : body)}
                </div>
                <div className="flex gap-2 gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                      <Button 
                        outline
                        label={secondaryActionLabel}  
                        handleClick={handleSecondaryAction} 
                        disabled={disabled} />
                  )}
                  <Button 
                      label={actionLabel}  
                      handleClick={handleSubmit} 
                      disabled={disabled} />
                </div>
                {footer}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;