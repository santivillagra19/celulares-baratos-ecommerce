
export interface ICartItem {
    variantId: string;
    productId: string;
    name: string;
    color: string | null;
    storage: string | null;
    price: number;
    quantity: number;
    image: string;
}