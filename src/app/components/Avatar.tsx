'use client';

import Image from 'next/image';

type AvatarProps = {
  src?: string | null | undefined,
}

const Avatar = ({ src } : AvatarProps) => {
  return (
    <Image
        className='rounded-full'
        height='30'
        width='30'
        alt='Avatar'
        src={src ||  '/images/avatar_placeholder.svg'} />
  );
};

export default Avatar;