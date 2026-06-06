import { Navigate, Outlet } from "react-router-dom"
import { Sidebar } from "../components/dashboard"
import { useUser } from "../hooks"
import { useUserRole } from "../hooks/auth/useUserRole"
import { BiLoader } from "react-icons/bi";

export const DashboardLayout = () => {
    const { session, isLoading: isLoadingSession } = useUser();
    const userId = session?.session?.user?.id;
    const { role, isLoading: isLoadingRole } = useUserRole(userId);

    const isLoading = isLoadingSession || isLoadingRole;

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100">
                <BiLoader className="text-4xl animate-spin text-cyan-600" />
            </div>
        );
    }

    // Verifica si hay sesión y si el rol del usuario es 'admin'
    if (!userId || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex bg-gray-100 min-h-screen font-montserrat">
            <Sidebar />

            <main className="flex-1 p-5 mt-7 text-slate-800 ml-[120px] lg:ml-[250px]">
                <Outlet />
            </main>
        </div>
    )
}