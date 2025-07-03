'use client';

import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = () => {
    const { unreadCount } : { unreadCount?: number } = useGlobalContext();

    return (
        <span className='absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs leading-none font-bold text-white'>
            {unreadCount}
        </span>
    );
}

export default UnreadMessageCount;