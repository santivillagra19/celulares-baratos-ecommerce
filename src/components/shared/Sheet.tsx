import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store";
import { Cart } from "./Cart";
import { Search } from "./Search";

export const Sheet = () => {
    const isSheetOpen = useGlobalStore(state => state.isSheetOpen);
    const sheetContent = useGlobalStore(state => state.sheetContent);
    const closeSheet = useGlobalStore(state => state.closeSheet);
    const sheetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isSheetOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleOutsideClick = (event: MouseEvent) => {
            if (isSheetOpen && sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                closeSheet();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSheetOpen, closeSheet]);

    const renderContent = () => {
        switch (sheetContent) {
            case 'cart': return <Cart />;
            case 'search': return <Search />;
            default: return null;
        }
    };

    return (
        <div
            className={`
                fixed inset-0 z-50 flex justify-end
                ${isSheetOpen ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
        >
            <div
                onClick={closeSheet}
                className={`
                    absolute inset-0 bg-black/50 backdrop-blur-sm
                    transition-opacity duration-300 ease-out
                    ${isSheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />

            <div
                ref={sheetRef}
                className={`
                    relative bg-white text-black h-screen w-full md:w-[450px] md:rounded-l-3xl shadow-2xl pointer-events-auto
                    transform transition-transform duration-300 ease-out flex flex-col
                    ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="h-full overflow-y-auto p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}