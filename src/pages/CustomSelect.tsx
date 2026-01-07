import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

// Props para hacerlo reutilizable
interface CustomSelectProps {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}

export const CustomSelect = ({ options, selected, onChange }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cerrar el menú si se hace click afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-fit" ref={containerRef}>
            {/* 1. El "Trigger" (lo que parece el select cerrado) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
            flex items-center gap-3 px-4 py-2 bg-white
            border border-gray-300 rounded-lg 
            text-sm font-medium text-gray-700
            transition-all duration-200
            hover:border-slate-800 focus:ring-2 focus:ring-slate-800 focus:outline-none
            ${isOpen ? 'border-slate-800 ring-2 ring-slate-800' : ''}
        `}
            >
                <span>{selected}</span>
                <LuChevronDown
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* 2. El Menú Desplegable (La lista personalizada) */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[140px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <ul className="flex flex-col p-1">
                        {options.map((option) => (
                            <li key={option}>
                                <button
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`
                    w-full text-left px-3 py-2 text-sm rounded-lg transition-colors
                    ${selected === option
                                            ? 'bg-slate-100 font-semibold text-slate-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};