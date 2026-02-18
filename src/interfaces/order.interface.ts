
export interface OrderInput {
    address: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        codPostal?: string;
        pais: string;
    };
    cartItems: {
        variantId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
};
