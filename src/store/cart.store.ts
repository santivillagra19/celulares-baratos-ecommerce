import { create, type StateCreator } from "zustand";
import type { ICartItem } from "../interfaces";
import { devtools, persist } from "zustand/middleware";

export interface CartState {
    cart: ICartItem[];

    addToCart: (item: ICartItem) => void;
    removeFromCart: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    cleanCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const storeApi: StateCreator<CartState> = (set, get) => ({
    cart: [] as ICartItem[],

    addToCart: (item) => {
        const { cart } = get();

        const productInCart = cart.some(cartItem => cartItem.variantId === item.variantId);

        if (!productInCart) {
            set({
                cart: [...cart, item]
            });
            return;
        }

        const updatedCart = cart.map(cartItem => {
            if (cartItem.variantId === item.variantId) {
                return { ...cartItem, quantity: cartItem.quantity + item.quantity }
            }
            return cartItem;
        });

        set({ cart: updatedCart });
    },

    removeFromCart: (variantId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.variantId !== variantId) });
    },

    updateQuantity: (variantId, quantity) => {
        const { cart } = get();

        // Validación opcional: No permitir menos de 1
        if (quantity < 1) return;

        const updatedCart = cart.map(item => {
            if (item.variantId === variantId) {
                return { ...item, quantity };
            }
            return item;
        });

        set({ cart: updatedCart });
    },

    cleanCart: () => {
        set({ cart: [] });
    },

    getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    },

    getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },
});

export const useCartStore = create<CartState>()(
    devtools(
        persist(storeApi, { name: 'ecommerce-cart' })
    )
);