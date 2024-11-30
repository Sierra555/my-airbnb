'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputProps = {
    id: string,
    label: string,
    type?: string,
    disabled?: boolean,
    formatPrice?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    required?: boolean,
}

const Input = ({ id, label, type='text', disabled, formatPrice, register, errors, required } : InputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
         <BiDollar 
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
            aria-hidden
          "
         />
      )}
      <label htmlFor={id} className="sr-only">Enter your {label}</label>
      <input 
        id={id}
        placeholder={label}
        {...register(id, { required })}
        type={type}
        disabled={disabled}
        className={`
          peer
          w-full
          p-4
          mb-4
          text-lg
          font-light
          border-2
          rounded-md
          outline-none
          hover:opacity-70
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `
        }
        />
    </div>
  );
};

export default Input;