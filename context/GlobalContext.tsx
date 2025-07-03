'use client';

import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children } : { children: ReactNode }) => {
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const { data:session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnreadMessageCount().then((response: any) => {
                if (response.count) setUnreadCount(response.count);
            });
        }
    }, [getUnreadMessageCount, session]);

    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}} >
            {children}
        </ GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}