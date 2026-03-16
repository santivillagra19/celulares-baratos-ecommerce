import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"; // Para el indicador de "ver más"
import type { OrderItemSingle } from "../interfaces/order.interface";
import { formatPrice } from "../helpers";
import { OrderStatusBadge } from "../components/shared/OrderStatusBadge";

interface Props {
    orders: OrderItemSingle[];
}

const tableHeaders = ['Pedido', 'Fecha de compra', 'Estado', 'Total', ''];

export const TableOrders = ({ orders }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="w-full overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-200">
                            {tableHeaders.map((header, index) => (
                                <th key={index} className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="group cursor-pointer hover:bg-gray-50/80 transition-all duration-200"
                                onClick={() => navigate(`/account/pedidos/${order.id}`)}
                            >
                                {/* ID Estilizado */}
                                <td className="px-6 py-5">
                                    <span className="text-sm font-mono font-medium text-gray-400">
                                        #{String(order.id).padStart(5, '0')}
                                    </span>
                                </td>

                                {/* Fecha */}
                                <td className="px-6 py-5">
                                    <span className="text-sm text-gray-600 font-medium">
                                        {new Date(order.created_at).toLocaleDateString('es-AR', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </td>

                                {/* Estado */}
                                <td className="px-6 py-5">
                                    <OrderStatusBadge status={order.status} />
                                </td>

                                {/* Total */}
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-gray-900">
                                        {formatPrice(order.total_amount)}
                                    </span>
                                </td>

                                {/* Flecha de acción */}
                                <td className="px-6 py-5 text-right">
                                    <div className="flex justify-end">
                                        <FiChevronRight className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 w-5 h-5" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};