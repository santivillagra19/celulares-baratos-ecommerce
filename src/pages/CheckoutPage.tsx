import { Link, Navigate } from "react-router-dom"
import { useCartStore } from "../store/cart.store"
import { FormCheckout } from "../components/checkout/FormCheckout";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { LuLoader } from "react-icons/lu";

export const CheckOutPage = () => {
    const totalItems = useCartStore(state => state.getTotalItems());
    const { session, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <LuLoader className="text-4xl animate-spin text-black" />
            </div>
        );
    }

    if (!session?.session) {
        return <Navigate to="/login" replace />;
    }

    return <div
        style={{
            minHeight: 'calc(100vh - 100px, )'
        }}
    >
        <header className="h-[100px] bg-white text-black flex items-center justify-center flex-col px-10 border-b 
            border-slate-200">
            <Link to='/' className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start">
                <p className="">
                    Celulares
                    <span className="text-cyan-600">Baratos</span>
                </p>
            </Link>
        </header>

        <main className="w-full h-full flex relative">
            {
                totalItems === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-5 w-full"
                        style={{
                            height: 'calc(100vh - 100px)'
                        }}
                    >
                        <p className="text-sm font-medium tracking-tight">
                            Tu carrito está vacío
                        </p>
                        <Link to='/celulares' className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase
                        tracking-widest font-semibold"
                        >
                            Empezar a comprar
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="w-full md:w-[50%] p-10">
                            <FormCheckout />
                        </div>

                        <div className="bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block"
                            style={{
                                minHeight: 'calc(100vh - 100px)'
                            }}
                        >
                            <ItemsCheckout />
                        </div>
                    </>
                )
            }
        </main>
    </div>
}