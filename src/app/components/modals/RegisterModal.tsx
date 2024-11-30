'use client';

import Modal from './Modal';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from "react-icons/fa";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            await axios.post('/api/register', data);
            toast.success('Now you can log in!');
            registerModal.onClose();
            loginModal.onOpen();
        } catch (error) {
            toast.error(`Something went wrong: ${error}`)
        } finally {
            setIsLoading(false);
            reset();
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome to Airbnb'
                subtitle='Create an account!' 
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
                    id="name"
                    label="Name"
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
                <p>Already have an account?</p>
                <button
                    type='button'
                    onClick={() => { 
                        registerModal.onClose();
                        loginModal.onOpen();
                    }} 
                    className='hover:underline cursor-pointer'>
                        Log in
                </button>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Sign up'
        onClose={registerModal.onClose}
        onOpen={registerModal.onOpen}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel='Continue'
        body={bodyContent}
        footer={footerContent}
     >
    </Modal>
  );
};

export default RegisterModal;