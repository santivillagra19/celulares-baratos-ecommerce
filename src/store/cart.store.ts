import { create, type StateCreator } from "zustand";
import type { Product, VariantProduct } from "../interfaces";
import { devtools, persist } from "zustand/middleware";


export interface CartItem {
    product: Product;
    variant: VariantProduct;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product, variant: VariantProduct, quantity: number) => void;
    removeFromCart: (variantId: string) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const storeApi: StateCreator<CartState> = (set, get) => ({
    cart: [],

    addToCart: (product, variant, quantity) => {
        const { cart } = get();

        const productInCart = cart.some(item => item.variant.id === variant.id);

        if (!productInCart) {
            set({
                cart: [...cart, { product, variant, quantity }]
            });
            return;
        }

        const updatedCart = cart.map(item => {
            if (item.variant.id === variant.id) {
                return { ...item, quantity: item.quantity + quantity }
            }
            return item;
        });

        set({ cart: updatedCart });
    },

    removeFromCart: (variantId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.variant.id !== variantId) });
    },

    getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    },

    getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + (item.variant.price * item.quantity), 0);
    },


});

export const useCartStore = create<CartState>()(
    devtools(
        persist(storeApi, { name: 'ecommerce-cart' })
    )
);