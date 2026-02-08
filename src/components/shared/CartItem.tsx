import { formatPrice } from "../../helpers";
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
import { useCartStore } from "../../store/cart.store";
import type { ICartItem } from "../../interfaces";

interface Props {
    item: ICartItem;
}

export const CartItem = ({ item }: Props) => {
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeFromCart);

    const increment = () => {
        updateQuantity(item.variantId, item.quantity + 1);
    };

    const decrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item.variantId, item.quantity - 1);
        }
    };

    return <li className="flex justify-between items-center gap-5 py-4 border-b border-slate-200 last:border-none">
        <div className="flex ">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
        </div>

        <div className="flex-1 space-y-3">
            <div className="flex justify-between">
                <p className="font-semibold">
                    {item.name}
                </p>
                <p className="text-sm font-medium text-gray-600 mt-1">
                    {formatPrice(item.price)}
                </p>
            </div>

            <div className="flex gap-3">
                <p className="text-[13px] text-gray-600">
                    {item.storage && <span>{item.storage}</span>}
                    {item.storage && item.color && <span> / </span>}
                    {item.color && <span>{item.color}</span>}
                </p>
            </div>

            <div className="flex gap-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-5 px-2 py-1 border border-slate-200 w-fit rounded-full">
                        <button
                            onClick={decrement}
                            disabled={item.quantity === 1}
                            className="p-1 text-slate-600 hover:text-black disabled:opacity-30"
                        >
                            <LuMinus size={12} />
                        </button>

                        <span className="text-xs font-medium w-4 text-center">
                            {item.quantity}
                        </span>

                        <button
                            onClick={increment}
                            className="p-1 text-slate-600 hover:text-black"
                        >
                            <LuPlus size={12} />
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <LuTrash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    </li>
};