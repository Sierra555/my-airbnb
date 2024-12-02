'use client';

import Container from '../Container';
import { categories } from '@/app/constants';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Loader from '../Loader';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const isMainPage = usePathname() === '/';

    if (!isMainPage) {
        return null;
    }
    
    return (
        <Container>
            <Suspense fallback={<Loader />}> 
                <div className={
                    `flex 
                    items-center 
                    justify-between 
                    pt-4
                    overflow-x-auto`
                }>
                    {categories.map((item) => (
                        <CategoryBox 
                            key={item.label} 
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                        />
                    ))}
                </div>
            </Suspense>
        </Container>
    );
};

export default Categories;
