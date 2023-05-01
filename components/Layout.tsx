import Head from 'next/head';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Chat, SystemPrompt } from '@/types';
import * as idb from '@/utils/indexedDB';
import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAll } from '@/store/chatsSlice';
import { setAllRoles } from '@/store/rolesSlice';
import { toggleSidebar } from '../store/uiSlice';
import SettingModal from './Sidebar/settings/SettingModal';
import UsageModal from './Sidebar/settings/UsageModal';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector((state) => state.ui.sidebar);
    const onClickSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRecords = async () => {
            const roles: SystemPrompt[] = await idb.get('roles');
            if (roles) {
                dispatch(setAllRoles(roles));
            }
            const chats: Chat[] = await idb.get('chats');
            if (chats) {
                dispatch(setAll(chats));
            }
            setIsLoading(false);
        };
        loadRecords();
    }, [dispatch]);

    return isLoading ? (
        <div className=''>loading...</div>
    ) : (
        <>
            <Head>
                <title>cb</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='fixed flex h-full w-full items-stretch'>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={onClickSidebar} />
                <main
                    className={`flex flex-col flex-grow h-full w-full transition-width duration-300 items-center justify-between relative
                    ${isSidebarOpen ? 'ml-64' : ''}`}
                >
                    <Header toggleSidebar={onClickSidebar} />
                    {children}
                </main>
                <SettingModal />
                <UsageModal />
            </div>
        </>
    );
}
