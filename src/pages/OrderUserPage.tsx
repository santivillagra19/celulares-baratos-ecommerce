import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiMapPin } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

import { getOrderById } from "../actions/order";
import { formatPrice } from "../helpers";
import { OrderStatusBadge } from "../components/shared/OrderStatusBadge";
import type { OrderDetail } from "../interfaces/order.interface";

export const OrderUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        if (!id) return;

        setIsPending(true); // Siempre es bueno resetearlo si el ID cambia

        getOrderById(Number(id))
            .then((data) => {
                setOrder(data as OrderDetail);
            })
            .catch((err) => {
                console.error("Error al cargar el pedido:", err);
                // Opcional: setOrder(null) para limpiar si hubo error
            })
            .finally(() => setIsPending(false));
    }, [id]);

    // 3. Estado de carga 
    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <ImSpinner2 className="animate-spin h-12 w-12 text-black" />
                <p className="text-gray-500 animate-pulse">Cargando detalles...</p>
            </div>
        );
    }

    // 4. Manejo de pedido no encontrado
    if (!order) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-semibold text-gray-800">No se encontró el pedido.</p>
                <button
                    onClick={() => navigate('/account/pedidos')}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto w-full p-4 slide-in-from-bottom-2 ">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Volver a mis pedidos
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pedido #{id}</h1>
                    <p className="text-gray-500 mt-1">
                        Cliente: <span className="font-medium text-gray-800">{order.customer.full_name}</span>
                    </p>
                </div>
                {/* 5. Uso del componente compartido */}
                <OrderStatusBadge status={order.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* COLUMNA IZQUIERDA: Productos */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-4 text-gray-800">
                            <FiPackage className="text-gray-400" /> Productos comprados
                        </h2>

                        <div className="divide-y divide-gray-100">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="py-5 flex gap-4 items-center first:pt-0 last:pb-0">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                        <img
                                            src={item.product_image || '/placeholder.png'}
                                            alt={item.product_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate">{item.product_name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">
                                            {item.color_name} • {item.storage}
                                        </p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                            <p className="font-bold text-gray-900 md:hidden">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="hidden md:block font-bold text-gray-900 text-lg">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Envío y Resumen */}
                <div className="space-y-6">
                    {/* Tarjeta de Envío */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
                            <FiMapPin className="text-gray-400" /> Dirección de envío
                        </h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-bold text-gray-900">{order.address.addressLine1}</p>
                            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                            <p>{order.address.city}, {order.address.state}</p>
                            <p className="text-gray-400">{order.address.codPostal} • {order.address.pais}</p>
                        </div>
                    </div>

                    {/* Resumen de Pago */}
                    <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl">
                        <h2 className="font-bold text-white/50 text-xs uppercase tracking-widest mb-6">Resumen del pedido</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-white/70">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/70">
                                <span>Costo de envío</span>
                                <span className="text-emerald-400 font-medium">Gratis</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-white/50">Total pagado</span>
                                <span className="text-2xl font-bold tracking-tighter">
                                    {formatPrice(order.totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};