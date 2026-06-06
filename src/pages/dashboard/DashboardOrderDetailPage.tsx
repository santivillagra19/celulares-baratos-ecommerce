import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiMapPin } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

import { getOrderById } from "../../actions/order";
import { formatPrice } from "../../helpers";
import { useUpdateOrderStatus } from "../../hooks/orders/useUpdateOrderStatus";
import type { OrderDetail } from "../..//interfaces";

export const DashboardOrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isPending, setIsPending] = useState(true);
    const { updateStatus, isUpdating } = useUpdateOrderStatus();

    useEffect(() => {
        if (!id) return;
        setIsPending(true);
        getOrderById(Number(id))
            .then((data) => setOrder(data as OrderDetail))
            .catch((err) => console.error("Error al cargar el pedido:", err))
            .finally(() => setIsPending(false));
    }, [id]);

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <ImSpinner2 className="animate-spin h-12 w-12 text-cyan-600" />
                <p className="text-gray-500 animate-pulse">Cargando detalles del pedido...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-xl font-semibold text-gray-800">No se encontró el pedido.</p>
                <button
                    onClick={() => navigate('/dashboard/pedidos')}
                    className="mt-4 text-cyan-600 hover:underline font-medium"
                >
                    Volver a la lista de pedidos
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto w-full slide-in-from-bottom-2">
            <button
                onClick={() => navigate('/dashboard/pedidos')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Volver a pedidos
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pedido #{id}</h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Realizado por: <span className="font-medium text-gray-800">{order.customer.full_name}</span> ({order.customer.email})
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                    <select 
                        className={`text-sm font-bold rounded-lg border focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors cursor-pointer outline-none shadow-sm ${
                            order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            order.status === 'Paid' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                        value={order.status}
                        onChange={(e) => {
                            const newStatus = e.target.value as 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
                            updateStatus({ orderId: Number(id), status: newStatus });
                            setOrder({ ...order, status: newStatus });
                        }}
                        disabled={isUpdating}
                    >
                        <option value="Pending" className="bg-white text-gray-800">Pendiente</option>
                        <option value="Paid" className="bg-white text-gray-800">Pagado</option>
                        <option value="Shipped" className="bg-white text-gray-800">Enviado</option>
                        <option value="Delivered" className="bg-white text-gray-800">Entregado</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-6 flex items-center gap-2 border-b pb-4 text-gray-800">
                            <FiPackage className="text-cyan-600" /> PRODUCTOS
                        </h2>

                        <div className="divide-y divide-gray-100">
                            {order.orderItems?.map((item, index) => (
                                <div key={index} className="py-5 flex gap-4 items-center first:pt-0 last:pb-0">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                        <img
                                            src={item.product_image || 'https://ui.shadcn.com/placeholder.svg'}
                                            alt={item.product_name}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate">{item.product_name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5 font-medium bg-gray-100 inline-block px-2 py-1 rounded-md">
                                            {item.color_name} • {item.storage}
                                        </p>
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">Cant: {item.quantity}</p>
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

                <div className="space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
                            <FiMapPin className="text-cyan-600" /> Dirección de envío
                        </h2>
                        <div className="text-sm text-gray-600 space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="font-bold text-gray-900">{order.address.addressLine1}</p>
                            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                            <p>{order.address.city}, {order.address.state}</p>
                            <p className="text-gray-500 pt-2 mt-2 border-t border-gray-200">{order.address.codPostal} • {order.address.pais}</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 text-white rounded-2xl p-6 shadow-md">
                        <h2 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-6">Resumen financiero</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-white/80">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/80">
                                <span>Envío</span>
                                <span className="text-cyan-400 font-medium">Gratis</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-5">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-white/60">Total</span>
                                <span className="text-2xl font-bold tracking-tighter text-white">
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
