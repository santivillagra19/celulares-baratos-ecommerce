import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";
import { supabase } from "../../supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserRole } from "../../hooks/auth/useUserRole";

export const Navbar = () => {
    const openSheet = useGlobalStore(state => state.openSheet);
    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const { session, isLoading } = useUser();

    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const user = session?.session?.user;
    const { role } = useUserRole(user?.id);
    const userInitial = (user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setShowUserMenu(false);
        toast.success("Sesión cerrada correctamente");
        navigate('/');
        window.scrollTo(0, 0);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-sm border-gray-100 py-3' : 'bg-white/90 backdrop-blur-md border-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                <Logo />

                <nav className="hidden md:flex items-center gap-1">
                    {navbarLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) =>
                                `text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${isActive ? 'text-black bg-gray-100 font-semibold shadow-sm' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex gap-2 items-center">
                <button onClick={() => openSheet('search')} className="p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 text-gray-700">
                    <HiOutlineSearch size={22} />
                </button>

                <div className="relative">
                    {isLoading ? (
                        <div className="p-2.5">
                            <LuLoader className="animate-spin text-gray-400" size={20} />
                        </div>
                    ) : session?.session ? (
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-10 h-10 ml-1 rounded-full bg-gradient-to-tr from-gray-800 to-black text-white text-sm font-bold flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all"
                        >
                            {userInitial}
                        </button>
                    ) : (
                        <Link to='/login' className="p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 text-gray-700 block">
                            <HiOutlineUser size={22} />
                        </Link>
                    )}

                    {showUserMenu && (
                        <div className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                            {role === 'admin' && (
                                <Link
                                    to="/dashboard"
                                    onClick={() => setShowUserMenu(false)}
                                    className="block px-4 py-2.5 text-sm text-cyan-700 hover:bg-cyan-50 rounded-xl font-bold transition-colors mb-1"
                                >
                                    Panel de Admin
                                </Link>
                            )}
                            <Link
                                to="/account/pedidos"
                                onClick={() => setShowUserMenu(false)}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                            >
                                Mis Pedidos
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2.5 mt-1 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => openSheet('cart')} className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 text-gray-700">
                    <HiOutlineShoppingBag size={22} />
                    {totalItemsInCart > 0 && (
                        <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                            {totalItemsInCart}
                        </span>
                    )}
                </button>

                <button onClick={() => setActiveNavMobile(true)} className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors ml-1 text-gray-700">
                    <FaBarsStaggered size={20} />
                </button>
            </div>
            </div>
        </header>
    );
};