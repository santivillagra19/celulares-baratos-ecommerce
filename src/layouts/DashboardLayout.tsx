import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/dashboard"

export const DashboardLayout = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen font-montserrat">
            <Sidebar />

            <main className="flex-1 p-5 mt-7 text-slate-800 ml-[120px] lg:ml-[250px]">
                <Outlet />
            </main>
        </div>
    )
}