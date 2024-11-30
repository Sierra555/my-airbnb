'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    const cloudinary: any;
}

type ImageUploadProps = {
    id: string,
    value: string,
    onChange: (value: string) => void,
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    required?: boolean;
}

const ImageUpload = ({ id, value, onChange, register, errors, required } : ImageUploadProps) => {
    const handleImgUplad = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);
    
  return (
    <CldUploadWidget 
        uploadPreset='dvqnqu05i'
        onSuccess={handleImgUplad}
        options={{
            maxFiles: 1
        }}
    >
    {({ open}) => {
        return (
            <button
                onClick={() => open?.()}
                className={`
                    relative
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
                {...register(id, { required })}
            >
                <TbPhotoPlus size={50}/>
                <span className='font-semibold text-lg'>
                    Click to upload
                </span>
                {value && (
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            alt='Upload'
                            fill
                            style={{objectFit: 'cover'}}
                            src={value}
                            sizes="80vw"
                         />
                    </div>
                )}
            </button>
        )
    } }
    </CldUploadWidget>
  );
};

export default ImageUpload;