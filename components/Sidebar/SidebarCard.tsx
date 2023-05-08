import clsx from "clsx";

const cardClasses =
    "bg-light-bg-card hover:bg-light-bg-card-hover dark:text-dark-text dark:bg-dark-bg-card dark:hover:bg-dark-bg-card-hover relative mx-2 flex h-12 animate-slideIn cursor-pointer items-center gap-2 rounded-md py-1 px-2 [&_.chat-item-btns]:hover:right-2 [&_.chat-item-btns]:hover:opacity-100";

const SidebarCard = (props: { children: React.ReactNode; isSelected?: boolean }) => {
    return (
        <div
            className={clsx(cardClasses, {
                "ring-2 ring-cyan-900": props.isSelected,
            })}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;