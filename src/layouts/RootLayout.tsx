import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner";
import { Newsletter } from "../components/home/Newsletter";
import { Sheet } from "../components/shared/Sheet";
import { useGlobalStore } from "../store/global.store";
import { NavbarMobile } from "../components/shared/NavbarMobile";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { useCartStore } from "../store/cart.store";

export const RootLayout = () => {
    const { pathname } = useLocation();
    const activeNavMobile = useGlobalStore(state => state.activeNavMobile);
    const cleanCart = useCartStore(state => state.cleanCart);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_OUT') {
                cleanCart();
            }
        });
        
        return () => subscription.unsubscribe();
    }, [cleanCart]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {
                pathname === '/' && (
                    <Banner />
                )
            }

            <main className="container mt-4 mb-16 flex-1 mx-auto px-4">
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
            <ScrollToTop />
            <Footer />
        </div>
    )
}