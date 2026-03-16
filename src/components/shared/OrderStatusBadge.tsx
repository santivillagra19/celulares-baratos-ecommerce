type OrderStatus = 'Pending' | 'Paid' | 'Shipped' | 'Delivered';

interface Props {
    status: OrderStatus | string;
}

export const OrderStatusBadge = ({ status }: Props) => {
    const statusMap: Record<string, { label: string; class: string }> = {
        'Pending': { label: 'Pendiente', class: 'bg-orange-50 text-orange-700 border-orange-100' },
        'Paid': { label: 'Pagado', class: 'bg-green-50 text-green-700 border-green-100' },
        'Shipped': { label: 'Enviado', class: 'bg-blue-50 text-blue-700 border-blue-100' },
        'Delivered': { label: 'Entregado', class: 'bg-green-50 text-green-700 border-green-100' },
    };

    const current = statusMap[status] || { label: status, class: 'bg-gray-50 text-gray-700 border-gray-100' };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${current.class} whitespace-nowrap`}>
            {current.label}
        </span>
    );
};