'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';

type PropertyType = {
    params: Promise<{ slug: string }>;
}

const PropertyPage: React.FC<PropertyType> = ({ params }) => {
    const { slug } = use(params);
    const router = useRouter();

    return <div className='flex flex-col w-full justify-center items-center'>
        <div className='flex w-full justify-center py-4'>
            This is property# {slug}
        </div>
        <div className='flex w-full justify-center'><button className='bg-black text-white hover:bg-gray-400 transition delay-150 duration-300 ease-in-out hover:text-white hover:scale-110 rounded-sm min-w-6 cursor-pointer px-6 py-1' onClick={() => router.replace('/')}>Go Home</button></div>
    </div>;
}

export default PropertyPage;