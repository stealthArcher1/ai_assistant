import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { selectAllChats } from '@/store/chatsSlice';
import { selectAllRoles } from '@/store/rolesSlice';
import { Chat, Role } from '@/types';

import BottomSection from './BottomSection';
import ChatList from './ChatList';
import RoleList from './RoleList';
import TopSection from './TopSection';

interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);
    const roles: Role[] | null = useSelector(selectAllRoles);
    console.log(`isSidebarOpen: ${isSidebarOpen}`);

    const sidebarClasses =
        'flex flex-col h-full bg-neutral-100 text-light-text dark:bg-dark-bg dark:text-text-dark transition-all duration-200';
    return (
        <div
            className={clsx(
                sidebarClasses,
                isSidebarOpen
                    ? 'w-full flex-shrink-0 sm:w-[17rem] md:w-[19rem] lg:w-[22rem]'
                    : 'invisible w-0'
            )}
        >
            <TopSection toggleSidebar={toggleSidebar} />
            <div className="relative h-full px-2 py-3">
                <ChatList chats={chats} />
                <RoleList roles={roles} />
            </div>
            <BottomSection />
        </div>
    );
}
