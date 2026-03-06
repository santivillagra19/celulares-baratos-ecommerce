import type { OrderInput } from "../interfaces/order.interface";
import { supabase } from "../supabase/client";

interface OrderItemFromDB {
    quantity: number;
    price: number;
    variants: {
        color_name: string;
        storage: string;
        products: {
            name: string;
            images: string[] | null;
        }
    }
}

export const createOrder = async (order: OrderInput) => {
    const { data, error: errorUser } = await supabase.auth.getUser();

    if (errorUser) {
        throw new Error(errorUser.message);
    };

    const userId = data.user.id;

    const { data: customer, error: errorCustomer } = await supabase.from('customers')
        .select('id')
        .eq('user_id', userId)
        .single();

    if (errorCustomer) {
        throw new Error(errorCustomer.message);
    };


    //  2. Verificar que haya stock suficiente para cada variante en el carrito
    for (const item of order.cartItems) {
        const { data: variantData, error: variantError } = await supabase.from('variants')
            .select('stock')
            .eq('id', item.variantId)
            .single();

        if (variantError) {
            throw new Error(variantError.message);
        };

        if (variantData.stock < item.quantity) {
            throw new Error('No hay stock suficiente para los artículos seleccionados');
        };
    }

    // 3.Guardar la direccion del envío
    const { data: addressData, error: addressError } = await supabase.from('addresses').insert({
        address_line1: order.address.addressLine1,
        address_line2: order.address.addressLine2,
        city: order.address.city,
        state: order.address.state,
        postal_code: order.address.codPostal,
        country: order.address.pais,
        customer_id: customer.id,
    })
        .select()
        .single();

    if (addressError) {
        throw new Error(addressError.message);
    };

    //  4. Crear la orden
    const { data: orderData, error: orderError } = await supabase.from('orders').insert({
        address_id: addressData.id,
        customer_id: customer.id,
        total_amount: order.totalAmount,
        status: 'Pending'
    })
        .select()
        .single();

    if (orderError) {
        throw new Error(orderError.message);
    };

    //  5. Guardar los detalles de la orden
    const orderItems = order.cartItems.map(item => ({
        order_id: orderData.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        price: item.price
    }));

    const { error: orderItemsError } = await supabase.from('order_items').insert(orderItems);

    if (orderItemsError) {
        throw new Error(orderItemsError?.message);
    };

    //  6. Actualizar el stock de las variantes
    for (const item of order.cartItems) {
        const { data: variantData } = await supabase
            .from('variants')
            .select('stock')
            .eq('id', item.variantId)
            .single();

        if (variantData) {
            const newStock = variantData.stock - item.quantity;

            const { error: updatedStockError } = await supabase
                .from('variants')
                .update({ stock: newStock })
                .eq('id', item.variantId);

            if (updatedStockError) {
                throw new Error('No se pudo actualizar el stock de la variante');
            };
        };

    };

    return orderData;
};


export const getOrdersByCustomerId = async () => {
    // No necesitamos buscar el UserID ni el CustomerID acá.
    // Supabase ya sabe quién sos por el JWT que viaja en el cliente.
    const { data: orders, error } = await supabase
        .from('orders')
        .select('id, total_amount, created_at, status')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    // Si la RLS está activa, 'orders' solo contendrá las filas 
    // donde auth.uid() coincida con el user_id del cliente.
    return orders;
};


export const getOrderById = async (orderId: number) => {
    const { data: order, error } = await supabase
        .from('orders')
        .select(`*,addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name,storage, products(name, images)))`)
        .eq('id', orderId)
        .single();

    if (error) throw new Error(error.message);

    return {
        customer: {
            email: order?.customers?.email,
            full_name: order?.customers?.full_name,
        },
        totalAmount: order?.total_amount,
        status: order?.status,
        address: {
            addressLine1: order?.addresses?.address_line1,
            addressLine2: order?.addresses?.address_line2,
            city: order?.addresses?.city,
            state: order?.addresses?.state,
            codPostal: order?.addresses?.postal_code,
            pais: order?.addresses?.country,
        },
        orderItems: order?.order_items.map((item: OrderItemFromDB) => ({
            quantity: item.quantity,
            price: item.price,
            color_name: item.variants?.color_name,
            storage: item.variants?.storage,
            product_name: item.variants?.products?.name,
            product_image: item.variants?.products?.images ? item.variants.products.images[0] : null,
        }))
    };
};
