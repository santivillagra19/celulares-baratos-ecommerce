import { formatPrice } from "../../helpers";
import { useCartStore } from "../../store/cart.store"
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";


export const ItemsCheckout = () => {
    const cartItems = useCartStore(state => state.cart);
    const totalAmount = useCartStore(state => state.getTotalPrice());
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeFromCart);

    return <div>
        <ul className="space-y-5 border-b border-gray-200 pb-5">
            {
                cartItems.map(item => (
                    <li key={item.variantId} className="flex justify-between items-center gap-5">
                        <div className="flex relative border border-stone-300 bg-stone-200 rounded-md">
                            <img src={item.image} alt={item.name} className="w-20 h-20  object-contain" />
                        </div>

                        <div className="flex-1 space-y-3">
                            <div className="flex justify-between">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm font-medium text-gray-600 mt-1">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-[13px] text-gray-600">{item.storage} / {item.color}</p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 px-2 py-1 border border-slate-200 w-fit rounded-full bg-white">
                                        <button
                                            type="button"
                                            onClick={() => item.quantity > 1 && updateQuantity(item.variantId, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                            className="p-1 text-slate-600 hover:text-black disabled:opacity-30 cursor-pointer transition-colors"
                                        >
                                            <LuMinus size={12} />
                                        </button>

                                        <span className="text-xs font-medium w-4 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                            className="p-1 text-slate-600 hover:text-black cursor-pointer transition-colors"
                                        >
                                            <LuPlus size={12} />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.variantId)}
                                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                        title="Eliminar"
                                    >
                                        <LuTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
        <div className="mt-4 pt-5 space-y-5">
            <div className="flex justify-between">
                <p className="text-sm font-medium ">Envío</p>
                <p className="text-sm font-medium uppercase">Gratis</p>
            </div>
            <div className="flex justify-between font-semibold text-xl">
                <p className="">Total:</p>
                <p className="Total:">{formatPrice(totalAmount)}</p>
            </div>
        </div>
    </div>
}