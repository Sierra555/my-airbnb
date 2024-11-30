'use client';

import { IconType } from 'react-icons';

type ButtonProps = {
    label: string,
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    icon?: IconType,
}
const Button = ({ label, handleClick, disabled, outline, small, icon: Icon } : ButtonProps) => {
  return (
    <button
        onClick={handleClick}
        disabled={disabled}
        className={`relative disabled:opacity-70 disabled:cursos-not-allowed rounded-lg hover:opacity-80 transition w-full 
                     ${outline ? 'bg-background border-foreground text-black hover:bg-gray-200' : 'bg-accent border-accent text-white'}
                      ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-lg font-semibold border-2'}`}
        >
            {Icon && 
            <Icon 
                size={24}
                className='absolute left-4 top-3' />}
        {label}
    </button>
  );
};

export default Button;