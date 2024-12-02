'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        className='hidden md:block cursor-pointer w-[100px] h-[32px]'
        src='/images/logo.png'
        alt='Logo'
        width={100}
        height={32}
      />
    </Link>
  );
};

export default Logo;