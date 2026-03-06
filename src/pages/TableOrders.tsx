import { useNavigate } from "react-router-dom";
import type { OrderItemSingle } from "../interfaces/order.interface";
import { formatPrice } from "../helpers";

interface Props {
    orders: OrderItemSingle[];
}

const tableHeaders = [
    'ID',
    'Fecha',
    'Estado',
    'Total',
];


export const TableOrders = ({ orders }: Props) => {
    const navigate = useNavigate();

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, { label: string; class: string }> = {
            'Pending': { label: 'Pendiente', class: 'bg-yellow-100 text-yellow-800' },
            'Delivered': { label: 'Entregado', class: 'bg-green-100 text-green-800' },
            'Shipped': { label: 'Enviado', class: 'bg-blue-100 text-blue-800' },
        };

        const current = statusMap[status] || { label: status, class: 'bg-gray-100 text-gray-800' };

        return (
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${current.class}`}>
                {current.label}
            </span>
        );
    };

    return <div className="relative h-full w-full overflow-x-auto">
        <table className="text-sm w-full caption-bottom overflow-auto">
            <thead className="border-b border-gray-200 pb-3">
                <tr className="text-sm font-bold">
                    {
                        tableHeaders.map((header, index) => (
                            <th key={index} className="h-12 px-4 text-left">
                                {header}
                            </th>
                        ))
                    }
                </tr>
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
                {
                    orders.map((order) => (
                        <tr
                            key={order.id}
                            className="cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => navigate(`/account/pedidos/${order.id}`)}
                        >
                            <td className="p-4 font-medium tracking-tighter">
                                #{order.id}
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                {new Date(order.created_at).toLocaleDateString('es-AR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                {getStatusLabel(order.status)}
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                {formatPrice(order.total_amount)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}