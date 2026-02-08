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
        <div className="flex px-5 py-7 justify-between items-center border-b border-slate-200">
            <span className="flex gap-3 items-center font-semibold">
                <HiOutlineShoppingBag size={20} />
                {totalItems} artículos
            </span>

            <button className="cursor-pointer" onClick={closeSheet}>
                <IoMdClose size={25} className="text-black" />
            </button>
        </div>

        {/* Lista de productos añadidos al carrito */}
        <div className="p-4 overflow-auto flex-1">
            {cart.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p>Tu carrito está vacío</p>
                </div>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <CartItem
                            key={item.variantId}
                            item={item}
                        />
                    ))}
                </ul>
            )}
        </div>

        <div className="mt-4 py-2">
            <div className="flex justify-between items-center mb-4 font-bold text-lg">
                <span>Total:</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>

            <Link
                onClick={closeSheet}
                to='/checkout'
                className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3"
            >
                <RiSecurePaymentLine size={24} />
                Continuar con la compra
            </Link>

            <button
                onClick={cleanCart}
                className="mt-3 w-full text-black border border-black rounded-full py-3 cursor-pointer"
            >
                Limpiar carrito
            </button>
        </div>
    </div>
};