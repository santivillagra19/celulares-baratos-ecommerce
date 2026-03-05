import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { FiBox } from "react-icons/fi";

type Order = {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
};

export const OrdersUserPage = () => {
    const isPending = false;
    const orders: Order[] = [

    ];

    if (isPending) {
        return (
            <div className="flex flex-col gap-3 items-center justify-center py-40">
                <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
                <p className="text-sm font-medium">Buscando tus pedidos...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto w-full p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Pedidos</h2>

            {!orders || orders.length === 0 ? (
                // ESTADO VACÍO
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-gray-200">
                    <FiBox className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Todavía no tenés ningún pedido registrado.</p>
                    <Link to="/celulares" className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                // LISTA DE PEDIDOS
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-gray-300 rounded-md p-5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-black transition-colors"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                    Orden #{order.id.slice(0, 8)}
                                </span>
                                <span className="text-sm text-gray-700">
                                    {new Date(order.created_at).toLocaleDateString('es-AR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 sm:items-end w-full sm:w-auto">
                                <span className="font-bold text-gray-900">
                                    ${order.total_amount.toLocaleString('es-AR')}
                                </span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full w-max ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status === 'Pending' ? 'Pendiente' :
                                        order.status === 'Delivered' ? 'Entregado' : order.status}
                                </span>
                            </div>

                            <button className="text-sm text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors w-full sm:w-auto font-medium mt-2 sm:mt-0">
                                Ver detalle
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}