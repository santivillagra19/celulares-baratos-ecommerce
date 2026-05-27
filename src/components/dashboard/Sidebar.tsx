import { NavLink } from "react-router-dom";
import { dashboardLinks } from "../../constants/links";
import { Logo } from "../shared/Logo";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "../../actions";

export const Sidebar = ( ) => {

    const handleLogOut = async() => {
        await signOut();
    }

    return <div className="w-[120px] bg-stone-800 text-white flex flex-col gap-10 
    items-center p-5 fixed h-screen lg:w-[250px]">
        <Logo isDashboard={true}/>

        <nav className="w-full space-y-5 flex-1">
            {
                dashboardLinks.map(link => (
                    <NavLink 
                    key={link.id}
                    to={link.href}
                    className={({ isActive }) => `flex flex-col items-center justify-center w-full text-center 
                    py-3 rounded-lg transition-colors ${isActive ? 'bg-cyan-600' : 'hover:bg-cyan-600'}`}
                    >
                        {link.icon}
                        <p className="font-semibold hidden lg:block mt-1">
                            {link.title}
                        </p>
                    </NavLink>
                ))
            }
        </nav>

        <button className="flex items-center gap-2" onClick={handleLogOut}>
            <span className="hidden lg:block ">Cerrar Sesión</span>
            <IoLogOutOutline size={25} className="inline-block"/>
        </button>
    </div>
};