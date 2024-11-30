'use client';

import React, { useCallback, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useClickOutside from '@/app/hooks/useClickOutside';
import { SafeUser } from "@/app/types";
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
    currentUser?: SafeUser | null,
  }

const UserMenu = ({ currentUser } : UserMenuProps) => {
    const modalRef = useRef(null);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleModalandMenu = (callback: () => void) => {
        if (callback) callback();
        
        toggleOpen();
    }

    useClickOutside([modalRef], () => setIsOpen(false));

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();

    }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative'>
        <div className='flex items-center gap-3'>
            <button 
                className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bd-neutral-100 transition-color cursor-pointer'
                onClick={onRent}
            >
                Airbnb your home
            </button>
            <button
            className='p-4 md:py-1 md:px-3 border-[1px] border-neutral-100 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                onClick={toggleOpen}
            >       
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </button>
        </div>
        {isOpen && (
            <div ref={modalRef} className='absolute rounded-lg shadow-md w-[40vw] md:w-3/4 bg-background right-0 top-12 text-sm'>
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem handleClick={() => router.push('/trips')} label='My trips' />
                            <MenuItem handleClick={() => router.push('/favorites')} label='My favorites' />
                            <MenuItem handleClick={() => router.push('/reservations')} label='My reservations' />
                            <MenuItem handleClick={() => router.push('/properties')} label='My properties' />
                            <MenuItem handleClick={() => handleModalandMenu(rentModal.onOpen)} label='Airbnb my home' />
                            <MenuItem handleClick={() => signOut()} label='Log out' />
                        </>
                    ) : (
                        <>
                            <MenuItem handleClick={() => handleModalandMenu(loginModal.onOpen)} label='Log in' />
                            <MenuItem handleClick={() => handleModalandMenu(registerModal.onOpen)} label='Sign up' />
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default UserMenu;