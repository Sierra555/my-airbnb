'use client';

import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

type CategoryBoxProps = 
    {
        label: string,
        icon: IconType,
        selected: boolean,
    }

const CategoryBox = ({ label, icon: Icon, selected } : CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        const currentQuery = params ? qs.parse(params.toString()) : {};

        const updatedQuery = {
            ...currentQuery,
            category: params?.get('category') === label ? undefined : label,
        }

        const filteredQuery = Object.fromEntries(Object.entries(updatedQuery).filter(([, value] ) => value !== undefined));

        const url = qs.stringifyUrl({
            url: '/',
            query: filteredQuery
        })

        router.push(url);
    }, [label, params, router]);

  return (
    <button 
        onClick={handleClick}
        className={`flex 
        flex-col 
        items-center 
        justify-center 
        gap-2 
        p-3 
        border-b2 
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
        aria-label={`Select category ${label}`}>
    <Icon size={24} />
    <h3 className="text-lg font-semibold">{label}</h3>
  </button>
  );
};

export default CategoryBox;