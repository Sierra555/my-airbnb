'use client';

import Modal from './Modal';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import useLoginModal from '@/app/hooks/useLoginModal';;
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then ((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Loged in successfully');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        }).finally(() => reset());
    }

    const bodyContent = (
        <div className="flex flex-col gap-2 md:gap-4">
            <Heading 
                title='Welcome back to Airbnb'
                subtitle='Log in to your account!' 
            />
            <form> 
                <Input 
                    id="email"
                    label="Email"
                    type='email'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="password"
                    label="Password"
                    type='password'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </form>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 items-center">
            <hr className="border-t w-full border-gray-300" />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                handleClick={() => signIn('google')}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={FaGithub}
                handleClick={() => {signIn('github')}}
            />
            <div className="flex justify-center items-center gap-2 text-neutral-500 font-light">
                <p>Dont have an account?</p>
                <button
                    type='button'
                    onClick={() => { 
                        loginModal.onClose();
                        registerModal.onOpen();
                    }} 
                    className='hover:underline cursor-pointer'>
                        Sign up
                </button>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Log in'
        onClose={loginModal.onClose}
        onOpen={loginModal.onOpen}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel='Continue'
        body={bodyContent}
        footer={footerContent}
     >
    </Modal>
  );
};

export default LoginModal;