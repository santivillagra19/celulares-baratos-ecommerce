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

    const [isScrolled, setIsScrolled] = useState(false);
    const { session, isLoading } = useUser();

    const user = session?.session?.user;
    const userMetaData = user?.user_metadata;

    const userInitial = userMetaData?.full_name
        ? userMetaData.full_name[0].toUpperCase()
        : user?.email
            ? user.email[0].toUpperCase()
            : 'U';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <header className={`
                fixed top-0 left-0 w-full z-50 px-5 lg:px-12 py-4 flex items-center justify-between
                transition-all duration-300 ease-in-out border-b
                
                ${isScrolled
            ? 'bg-white/50 backdrop-blur-lg shadow-sm border-transparent hover:bg-white hover:shadow-none hover:border-slate-200'
            : 'bg-white border-slate-200 shadow-none'
        }
            `}>
        <Logo />

        <nav className="space-x-5 hidden md:flex">
            {
                navbarLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.href}
                        className={({ isActive }) => `${isActive ? 'text-cyan-600 underline' : ''} transition-all
                        duration-300 font-medium hover:text-cyan-600 hover:underline-none`}
                    >
                        {link.title}
                    </NavLink>
                ))
            }
        </nav>

        <div className="flex gap-5 items-center ">
            <button onClick={() => openSheet('search')} className="cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors duration-200" >
                <HiOutlineSearch size={25}></HiOutlineSearch>
            </button>

            {isLoading ? (
                <LuLoader className="animate-spin" size={25} />
            ) : session?.session ? (
                <div className="relative ">
                    <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg
                font-bold cursor-pointer">
                        {userInitial}
                    </Link>
                </div>
            ) : (
                <Link to={'/login'}>
                    <HiOutlineUser size={25} />
                </Link>
            )
            }



            <button className="relative cursor-pointer" onClick={() => openSheet('cart')}>
                <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs
                rounded-full ">
                    {totalItemsInCart}
                </span>
                <HiOutlineShoppingBag size={25}></HiOutlineShoppingBag>
            </button>
        </div>

        <button className="md:hidden" onClick={() => setActiveNavMobile(true)}>
            <FaBarsStaggered size={25}></FaBarsStaggered>
        </button>
    </header>
};