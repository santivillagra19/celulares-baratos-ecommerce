import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";

export const Navbar = () => {
    // Stores y Hooks
    const openSheet = useGlobalStore(state => state.openSheet);
    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const { session, isLoading } = useUser();

    // Estado para el scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // Lógica de usuario simplificada
    const user = session?.session?.user;
    const userInitial = (user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase();

    useEffect(() => {
        const handleScroll = () => {
            // Umbral de 20px para activar el efecto
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`
            fixed top-0 left-0 w-full z-50 px-5 lg:px-12 py-4 flex items-center justify-between
            transition-all duration-500 ease-in-out border-b
            ${isScrolled
                ? 'bg-white/75 backdrop-blur-md shadow-sm border-slate-200/60 py-3'
                : 'bg-white border-slate-200 shadow-none py-5'
            }
        `}>
            <Logo />

            {/* Desktop Navigation */}
            <nav className="space-x-8 hidden md:flex">
                {navbarLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.href}
                        className={({ isActive }) => `
                            text-base font-semibold transition-colors duration-300
                            ${isActive ? 'text-cyan-600' : 'text-slate-600 hover:text-cyan-600'}
                        `}
                    >
                        {link.title}
                    </NavLink>
                ))}
            </nav>

            {/* Actions (Search, User, Cart) */}
            <div className="flex gap-4 items-center">

                {/* Botón de búsqueda */}
                <button
                    onClick={() => openSheet('search')}
                    aria-label="Buscar productos"
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
                >
                    <HiOutlineSearch size={24} />
                </button>

                {/* Sección de Usuario / Auth */}
                {isLoading ? (
                    <LuLoader className="animate-spin text-slate-400" size={22} />
                ) : session?.session ? (
                    <Link
                        to='/account'
                        title="Mi cuenta"
                        className="border-2 border-slate-800 w-9 h-9 rounded-full grid place-items-center text-sm font-black 
                                 hover:bg-slate-800 hover:text-white transition-all duration-300"
                    >
                        {userInitial}
                    </Link>
                ) : (
                    <Link to='/login' aria-label="Iniciar sesión" className="p-2">
                        <HiOutlineUser size={24} className="text-slate-700 hover:text-cyan-600 transition-colors" />
                    </Link>
                )}

                {/* Carrito con Badge Dinámico */}
                <button
                    className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
                    onClick={() => openSheet('cart')}
                    aria-label={`Ver carrito: ${totalItemsInCart} productos`}
                >
                    <HiOutlineShoppingBag size={24} />
                    {totalItemsInCart > 0 && (
                        <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 grid place-items-center 
                                       bg-cyan-600 text-white text-[10px] font-bold rounded-full animate-in zoom-in duration-300">
                            {totalItemsInCart}
                        </span>
                    )}
                </button>

                {/* Mobile Menu Trigger */}
                <button
                    className="md:hidden p-2 text-slate-800"
                    onClick={() => setActiveNavMobile(true)}
                    aria-label="Abrir menú de navegación"
                >
                    <FaBarsStaggered size={22} />
                </button>
            </div>
        </header>
    );
};