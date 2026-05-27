import { useEffect, useState } from "react";
import { LuChevronUp } from "react-icons/lu";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Muestra u oculta el botón basado en la posición del scroll
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Vuelve al principio suavemente
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            aria-label="Volver arriba"
        >
            <LuChevronUp size={24} />
        </button>
    );
};
