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
        /* CONTENEDOR PADRE:
           - Quitamos 'invisible' y 'transition'. 
           - Usamos solo 'z-index' y 'pointer-events'.
           - Si está cerrado, 'pointer-events-none' deja que los clics pasen a la página de abajo.
        */
        <div
            className={`
                fixed inset-0 z-50 flex justify-end
                ${isSheetOpen ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
        >
            {/* 1. OVERLAY (FONDO NEGRO):
               - Este sí maneja su propia opacidad.
               - pointer-events-auto para que capture el clic de cierre.
            */}
            <div
                onClick={closeSheet}
                className={`
                    absolute inset-0 bg-black/40 backdrop-blur-sm
                    transition-opacity duration-500 ease-in-out
                    ${isSheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />

            {/* 2. PANEL LATERAL:
               - Maneja su propia transformación.
               - IMPORTANTE: 'pointer-events-auto' para poder hacer clic DENTRO del carrito
                 aunque el padre tenga events-none.
            */}
            <div
                ref={sheetRef}
                className={`
                    relative bg-white text-black h-screen w-full md:w-[400px] shadow-2xl pointer-events-auto
                    transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
                    ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="h-full overflow-y-auto p-6">
                    {/* Renderizamos siempre, o condicionalmente si prefieres limpiar DOM al cerrar */}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}