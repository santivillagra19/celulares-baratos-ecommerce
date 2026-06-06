import { useState } from "react";
import { useAllOrders } from "../../../hooks/orders/useAllOrders";
import { useUpdateOrderStatus } from "../../../hooks/orders/useUpdateOrderStatus";
import { LuLoader } from "react-icons/lu";
import { Pagination } from "../../shared/Pagination";
import { formatPrice } from "../../../helpers";

const tableHeaders = ['Orden ID', 'Cliente', 'Fecha', 'Total', 'Estado'];

export const TableOrders = () => {
    const [page, setPage] = useState(1);
    const { orders, isLoading, totalOrders } = useAllOrders({ page });
    const { updateStatus, isUpdating } = useUpdateOrderStatus();

    if (isLoading || !orders) {
        return (
            <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white items-center justify-center min-h-[400px]">
                <LuLoader className="animate-spin text-blue-500 mb-4" size={48} />
                <p className="text-gray-500 font-medium animate-pulse">Cargando pedidos...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
            <h1 className="font-bold text-xl text-gray-800">Historial de Pedidos</h1>
            <p className="text-sm mt-1 mb-8 font-regular text-gray-500">
                Administra los pedidos de tus clientes y actualiza su estado de envío.
            </p>

            <div className="relative w-full overflow-auto">
                <table className="text-sm w-full caption-bottom">
                    <thead className="border-b border-gray-200 bg-gray-50/50">
                        <tr className="text-sm font-bold text-left">
                            {tableHeaders.map((header, i) => (
                                <th key={i} className="h-12 px-4 text-gray-600">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders?.map((order: any) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold text-slate-700">#{order.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-slate-700">{order.customers?.full_name || 'Usuario'}</div>
                                    <div className="text-xs text-gray-500">{order.customers?.email}</div>
                                </td>
                                <td className="p-4 text-gray-600">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-gray-800 font-semibold">
                                    {formatPrice(order.total_amount)}
                                </td>
                                <td className="p-4">
                                    <select 
                                        className={`text-sm font-medium rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors cursor-pointer outline-none shadow-sm ${
                                            order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' :
                                            order.status === 'Paid' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' :
                                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' :
                                            'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                        }`}
                                        value={order.status}
                                        onChange={(e) => updateStatus({ orderId: order.id, status: e.target.value })}
                                        disabled={isUpdating}
                                    >
                                        <option value="Pending" className="bg-white text-gray-800">Pendiente</option>
                                        <option value="Paid" className="bg-white text-gray-800">Pagado</option>
                                        <option value="Shipped" className="bg-white text-gray-800">Enviado</option>
                                        <option value="Delivered" className="bg-white text-gray-800">Entregado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders?.length === 0 && (
                    <p className="p-10 text-center text-gray-500">No hay pedidos registrados en esta página.</p>
                )}
            </div>
            
            <div className="mt-6">
                <Pagination page={page} setPage={setPage} totalItems={totalOrders} />
            </div>
        </div>
    );
};
