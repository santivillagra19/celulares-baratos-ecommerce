import { Navigate, Outlet, useNavigate } from "react-router-dom"
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

    return <div className="flex flex-col gap-5 mt-20">
        <main className="container mt-12 flex-1">
            <Outlet />
        </main>
    </div>
}