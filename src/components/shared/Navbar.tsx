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
    const openSheet = useGlobalStore(state => state.openSheet);
    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const { session, isLoading } = useUser();

    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const user = session?.session?.user;
    const userInitial = (user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all border-b ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-slate-100' : 'bg-white border-transparent'
            }`}>
            <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all ${isScrolled ? 'py-0.5' : 'py-1.5'}`}>
                <Logo />

                <nav className="hidden md:flex gap-6">
                    {navbarLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) =>
                                `text-sm font-bold transition-colors ${isActive ? 'text-cyan-600' : 'text-slate-500 hover:text-black'}`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex gap-3 items-center">
                <button onClick={() => openSheet('search')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <HiOutlineSearch size={22} />
                </button>

                {/* Dropdown de Usuario: Chau links flotantes */}
                <div className="relative">
                    {isLoading ? (
                        <LuLoader className="animate-spin text-slate-400" size={20} />
                    ) : session?.session ? (
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {userInitial}
                        </button>
                    ) : (
                        <Link to='/login' className="p-2">
                            <HiOutlineUser size={22} className="text-slate-700" />
                        </Link>
                    )}

                    {/* El menú que resuelve el problema de la foto */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 shadow-xl rounded-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                            <Link
                                to="/account/pedidos"
                                onClick={() => setShowUserMenu(false)}
                                className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-black font-medium"
                            >
                                Mis Pedidos
                            </Link>
                            <button
                                onClick={() => { signOut(); setShowUserMenu(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => openSheet('cart')} className="relative p-2">
                    <HiOutlineShoppingBag size={22} />
                    {totalItemsInCart > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {totalItemsInCart}
                        </span>
                    )}
                </button>

                <button onClick={() => setActiveNavMobile(true)} className="md:hidden">
                    <FaBarsStaggered size={20} />
                </button>
            </div>
            </div>
        </header>
    );
};