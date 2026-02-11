import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions"
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { BiLoader } from "react-icons/bi";


export const ClientLayout = () => {
    const { session, isLoading: isLoadingSession } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login')
            };
        })
    }, [navigate]);

    if (isLoadingSession) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <BiLoader className="text-4xl animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    const handleLogOut = async () => {
        await signOut();
        navigate('/');
    };

    return <div className="flex flex-col gap-5 mt-20">
        <nav className="flex justify-center gap-10 text-sm font-medium">
            <NavLink
                to='/account/pedidos'
                className={({ isActive }) => `${isActive ? 'underline' : 'hover:underline'} `}
            >
                Pedidos
            </NavLink>

            <button
                className="hover:underline cursor-pointer"
                onClick={handleLogOut}
            >
                Cerrar Sesión
            </button>
        </nav>

        <main className="container mt-12 flex-1">
            <Outlet />
        </main>
    </div>
}