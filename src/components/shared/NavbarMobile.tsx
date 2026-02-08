import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store"
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";


export const NavbarMobile = () => {
    const setActiveNavMobile = useGlobalStore(
        state => state.setActiveNavMobile
    );

    const handleCloseMenu = () => {
        setActiveNavMobile(false);
    };

    return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white shadow-lg slide-in-animation">

        <button className="absolute top-5 right-5" onClick={() => setActiveNavMobile(false)}>
            <IoMdClose size={30} className="text-black" />
        </button>

        <div className="flex flex-col gap-20 items-center text-center">
            <Link to="/" className="text-4xl font-bold tracking-tighter transition-all" onClick={() => setActiveNavMobile(false)}>
                <p className="">
                    Celulares
                    <span className="text-cyan-600">Baratos</span>
                </p>
            </Link>

            <nav className="flex flex-col items-center gap-5">
                {
                    navbarLinks.map(item => (
                        <NavLink
                            to={item.href}
                            key={item.id}
                            className={({ isActive }) => `
                                ${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-semibold text-xl hover:text-cyan-600 hover:underline
                            `}
                            onClick={handleCloseMenu}
                        >
                            {item.title}
                        </NavLink>
                    ))
                }
            </nav>
        </div>
    </div >
}