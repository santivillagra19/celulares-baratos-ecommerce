import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner";
import { Newsletter } from "../components/home/Newsletter";
import { Sheet } from "../components/shared/Sheet";
import { useGlobalStore } from "../store/global.store";
import { NavbarMobile } from "../components/shared/NavbarMobile";

export const RootLayout = () => {
    const { pathname } = useLocation();
    const activeNavMobile = useGlobalStore(state => state.activeNavMobile);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {
                pathname === '/' && (
                    <Banner />
                )
            }

            <main className="container my-8 flex-1 mx-auto px-4">
                <Outlet />

            </main>

            {
                pathname === '/' && (
                    <Newsletter />
                )
            }

            {
                <Sheet />
            }
            {
                activeNavMobile && <NavbarMobile />
            }
            <Footer />
        </div>
    )
}