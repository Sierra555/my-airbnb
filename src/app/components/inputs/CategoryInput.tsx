'use client';

import { IconType } from 'react-icons';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type CategoryInputProps = {
    onClick: (value: string) => void, 
    selected?: boolean, 
    label: string, 
    icon: IconType,
    description?: string,
}

const CategoryInput = ({ onClick, selected, label, icon: Icon, description } : CategoryInputProps) => {
  return (
    <>
        <button
            onClick={() => onClick(label)}
            className={`
                w-full
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
            aria-label={`Select category: ${label} - ${description}`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={description}
            >
            <Icon size={30} />
            <p className='font-semibold'>{label}</p>
        </button>
        <Tooltip place="top" variant="info" id="my-tooltip" delayShow={500} />
    </>
  );
};

export default CategoryInput;