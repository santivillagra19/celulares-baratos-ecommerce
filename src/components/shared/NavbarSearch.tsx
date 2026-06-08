import { useState, useRef, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../actions/product";
import { formatPrice } from "../../helpers";
import type { Product } from "../../interfaces";
import { LuLoader } from "react-icons/lu";

export const NavbarSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            setSearchTerm('');
            setSearchResults([]);
        }
    }, [isOpen]);

    // Live search as user types
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchTerm.trim().length > 1) {
                setIsSearching(true);
                const products = await searchProducts(searchTerm);
                setSearchResults(products);
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className="relative flex items-center">
            {isOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[220px] lg:w-[300px] transition-all duration-300">
                    <HiOutlineSearch size={20} className="text-gray-500 mr-2 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar celular..."
                        className="bg-transparent outline-none w-full text-sm font-medium text-gray-800"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-gray-400 hover:text-gray-600 ml-1 flex-shrink-0"
                    >
                        <IoMdClose size={18} />
                    </button>

                    {/* Resultados flotantes */}
                    {searchTerm.trim().length > 1 && (
                        <div className="absolute top-full mt-4 right-0 w-[300px] md:w-[350px] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                            {isSearching ? (
                                <div className="p-8 flex justify-center">
                                    <LuLoader className="animate-spin text-blue-500" size={24} />
                                </div>
                            ) : searchResults.length > 0 ? (
                                <ul className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
                                    {searchResults.map(product => (
                                        <li key={product.id}>
                                            <button
                                                className="w-full flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                                                onClick={() => {
                                                    navigate(`/celulares/${product.slug}`);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <div className="bg-white border border-gray-100 rounded-lg p-1 w-14 h-14 flex-shrink-0 flex items-center justify-center">
                                                    <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col flex-1 overflow-hidden">
                                                    <p className="text-sm font-bold text-gray-900 truncate">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-[11px] text-gray-500 font-medium">
                                                        {product.variants[0]?.storage} / {product.variants[0]?.color_name}
                                                    </p>
                                                    <p className="text-xs font-semibold text-gray-800 mt-0.5">
                                                        {formatPrice(product.variants[0]?.price || 0)}
                                                    </p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm font-medium">
                                    No se encontraron resultados para "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 text-gray-700"
                >
                    <HiOutlineSearch size={22} />
                </button>
            )}
        </div>
    );
};
