import { HiOutlineShoppingBag } from "react-icons/hi"
import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CartItem } from "./CartItem";
import { useCartStore } from "../../store/cart.store";
import { formatPrice } from "../../helpers";

export const Cart = () => {
    const closeSheet = useGlobalStore(state => state.closeSheet);

    const cart = useCartStore(state => state.cart);
    const cleanCart = useCartStore(state => state.cleanCart);
    const totalItems = useCartStore(state => state.getTotalItems());
    const totalPrice = useCartStore(state => state.getTotalPrice());

    return <div className="flex flex-col h-full">
        <div className="flex px-6 py-6 justify-between items-center border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <span className="flex gap-3 items-center font-bold text-xl text-gray-800">
                <HiOutlineShoppingBag size={24} className="text-blue-600" />
                Tu Carrito <span className="text-sm font-medium text-gray-500 ml-1">({totalItems})</span>
            </span>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={closeSheet}>
                <IoMdClose size={24} className="text-gray-600" />
            </button>
        </div>

        {/* Lista de productos añadidos al carrito */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                    <HiOutlineShoppingBag size={64} className="opacity-20" />
                    <p className="text-lg font-medium text-gray-500">Tu carrito está vacío</p>
                    <button onClick={closeSheet} className="mt-2 text-blue-600 font-semibold hover:underline">
                        Seguir comprando
                    </button>
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <CartItem
                            key={item.variantId}
                            item={item}
                        />
                    ))}
                </ul>
            )}
        </div>

        <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium text-lg">Total estimado:</span>
                <span className="font-bold text-2xl text-gray-900">{formatPrice(totalPrice)}</span>
            </div>

            <Link
                onClick={closeSheet}
                to='/checkout'
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] ${cart.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <RiSecurePaymentLine size={24} />
                Continuar compra
            </Link>

            {cart.length > 0 && (
                <button
                    onClick={cleanCart}
                    className="mt-4 w-full text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 font-medium rounded-xl py-3 transition-colors"
                >
                    Vaciar carrito
                </button>
            )}
        </div>
    </div>
};