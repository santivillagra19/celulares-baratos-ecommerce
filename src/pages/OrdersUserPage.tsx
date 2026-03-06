import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { FiBox } from "react-icons/fi";

import { TableOrders } from "../pages/TableOrders";
import { getOrdersByCustomerId } from "../actions/order";
import type { OrderItemSingle } from "../interfaces/order.interface";

export const OrdersUserPage = () => {
    const [orders, setOrders] = useState<OrderItemSingle[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setIsPending(true);
                const data = await getOrdersByCustomerId();
                setOrders(data as OrderItemSingle[]);

            } catch (err) {
                console.error("Error al obtener pedidos:", err);
                setError("Hubo un error al cargar tus pedidos. Por favor, reintentá más tarde.");

            } finally {
                setIsPending(false);
            }
        };

        loadOrders();
    }, []);

    if (isPending) {
        return (
            <div className="flex flex-col gap-3 items-center justify-center py-40">
                <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
                <p className="text-sm font-medium text-gray-600">Buscando tus pedidos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center py-20">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto w-full p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Pedidos</h2>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-gray-200">
                    <FiBox className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Todavía no tenés ningún pedido registrado.</p>
                    <Link to="/celulares" className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                // 4. Lista de Pedidos usando el componente TableOrders
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <TableOrders orders={orders} />
                </div>
            )}
        </div>
    );
};