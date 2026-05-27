import { useState, useRef, useEffect } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { formatPrice } from "../../helpers";
import { searchProducts } from "../../actions/product";
import type { Product } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const closeSheet = useGlobalStore(state => state.closeSheet);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-focus the search input when it opens
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (searchTerm.trim()) {
            setIsSearching(true);
            const products = await searchProducts(searchTerm);
            setSearchResults(products);
            setHasSearched(true);
            setIsSearching(false);
        }
    }

    return <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
            <form 
                className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-3 border border-transparent focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm transition-all" 
                onSubmit={handleSearch}
            >
                <HiOutlineSearch size={22} className="text-gray-500 mr-2" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="bg-transparent outline-none w-full text-base font-medium text-gray-800 placeholder-gray-400"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button 
                        type="button" 
                        onClick={() => { setSearchTerm(''); setSearchResults([]); setHasSearched(false); }} 
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <IoMdClose size={20} />
                    </button>
                )}
            </form>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0" onClick={closeSheet}>
                <IoMdClose size={26} className="text-gray-600" />
            </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
            {isSearching ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <LuLoader className="animate-spin mb-4 text-blue-500" size={32} />
                    <p className="font-medium">Buscando productos...</p>
                </div>
            ) : searchResults.length > 0 ? (
                <ul className="flex flex-col gap-2">
                    {searchResults.map(product => (
                        <li key={product.id}>
                            <button
                                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 text-left group"
                                onClick={() => {
                                    navigate(`/celulares/${product.slug}`);
                                    closeSheet();
                                }}
                            >
                                <div className="bg-white border border-gray-100 rounded-xl p-2 w-20 h-20 flex-shrink-0 flex items-center justify-center shadow-sm">
                                    <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {product.variants[0].storage} / {product.variants[0].color_name}
                                    </p>
                                    <p className="text-sm font-bold text-gray-800 mt-2">
                                        {formatPrice(product.variants[0].price)}
                                    </p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : hasSearched ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                    <HiOutlineSearch size={48} className="opacity-20" />
                    <p className="text-lg font-medium text-gray-500 text-center">No encontramos "{searchTerm}"</p>
                    <p className="text-sm">Intenta con otros términos</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                    <HiOutlineSearch size={48} className="opacity-10" />
                    <p className="text-base font-medium text-gray-500">Busca tu celular ideal</p>
                </div>
            )}
        </div>
    </div>
};