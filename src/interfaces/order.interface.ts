
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

export interface OrderItemSingle {
    created_at: string;
    id: number;
    status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
    total_amount: number;
}

// interfaces/order.interface.ts

export interface OrderDetail {
    // Datos del cliente vinculados a la orden
    customer: {
        email: string;
        full_name: string;
    };

    // El total ya calculado
    totalAmount: number;

    // Estados literales para que TypeScript te ayude con el Badge
    status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';

    // Información de envío (mapeada desde la tabla addresses)
    address: {
        addressLine1: string;
        addressLine2?: string; // Opcional por si no hay dpto/piso
        city: string;
        state: string;
        codPostal: string;
        pais: string;
    };

    // Array de productos con la info de las variantes y el producto base
    orderItems: {
        quantity: number;
        price: number;
        color_name: string;
        storage: string;
        product_name: string;
        product_image: string | null;
    }[];
}