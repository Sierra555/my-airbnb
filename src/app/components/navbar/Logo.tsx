'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      className='hidden md:block cursor-pointer w-[100px] h-[32px]'
      src='/images/logo.png'
      alt='Logo'
      width={100}
      height={32}
     />
  );
};

export default Logo;