import { BiLoader, BiCopy, BiShoppingBag } from "react-icons/bi";
import { useOrder } from "../hooks";
import { Link, useParams } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { toast } from "sonner";

export const ThankYouPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useOrder(Number(id));

    // Función para copiar datos
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("¡Copiado al portapapeles!");
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <BiLoader className="animate-spin text-cyan-600" size={50} />
                <p className="text-gray-500 animate-pulse">Cargando detalles de tu pedido...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-5">
                <h2 className="text-2xl font-bold text-gray-800">¡Ups! Algo salió mal</h2>
                <p className="text-gray-600 mb-6">No pudimos encontrar la información de tu orden.</p>
                <Link to="/" className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
            {/* Header / Logo */}
            <header className="text-center mb-10">
                <Link to="/" className="text-3xl font-black tracking-tight">
                    CELULARES<span className="text-cyan-600 uppercase">BARATOS</span>
                </Link>
            </header>

            <main className="flex flex-col items-center">
                {/* Éxito Section */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <CiCircleCheck size={80} className="text-green-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        ¡Gracias, {data.customer.full_name}!
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Tu pedido <span className="font-bold text-gray-800">#{id}</span> ha sido procesado.
                        Enviamos los detalles a <span className="font-medium text-cyan-700">{data.customer.email}</span>.
                    </p>
                </div>

                {/* Resumen Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
                    {/* Datos de Transferencia */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            Datos de Transferencia
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center group">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Banco</p>
                                <p className="font-medium">Galicia</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">CBU/Número</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-mono font-bold text-gray-800">12345678</p>
                                    <button
                                        onClick={() => copyToClipboard("12345678")}
                                        className="text-cyan-600 hover:text-cyan-800 p-1 cursor-pointer"
                                        title="Copiar número"
                                    >
                                        <BiCopy size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Monto Total</p>
                                <p className="font-bold text-xl text-green-700">${data.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Instrucciones */}
                    <div className="flex flex-col justify-center p-6 bg-cyan-50 border border-cyan-100 rounded-2xl">
                        <p className="text-cyan-800 text-sm leading-relaxed">
                            <span className="font-bold block mb-1">💡 Importante:</span>
                            Una vez realizada la transferencia, envíanos el comprobante por WhatsApp o respondiendo al mail de confirmación para que despachemos tu celular lo antes posible.
                        </p>
                    </div>
                </div>

                {/* Acciones Finales */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <BiShoppingBag size={20} />
                        Seguir comprando
                    </Link>

                    <Link
                        to="/account/pedidos"
                        className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Ver mis pedidos
                    </Link>
                </div>
            </main>
        </div>
    );
};