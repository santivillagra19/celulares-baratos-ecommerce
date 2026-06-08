import { FiShield, FiFileText, FiRefreshCcw, FiHelpCircle } from "react-icons/fi";

export const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto pt-32 pb-12 px-4 slide-in-from-bottom-2">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
                    Términos y Condiciones
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Por favor, lee detenidamente nuestras políticas antes de utilizar nuestros servicios o realizar una compra en Celulares Baratos.
                </p>
            </div>

            <div className="space-y-12">
                {/* Sección 1 */}
                <section className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center shrink-0">
                            <FiFileText size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">1. Condiciones Generales</h2>
                    </div>
                    <div className="text-gray-600 space-y-4 leading-relaxed">
                        <p>
                            Al acceder y realizar una compra en <strong>Celulares Baratos</strong>, aceptas estar sujeto a estos términos y condiciones. Nos reservamos el derecho de rechazar el servicio a cualquier persona por cualquier motivo en cualquier momento.
                        </p>
                        <p>
                            Los precios de nuestros productos están sujetos a cambios sin previo aviso. No seremos responsables ante ti ni ante ningún tercero por cualquier modificación, cambio de precio, suspensión o interrupción del servicio.
                        </p>
                    </div>
                </section>

                {/* Sección 2 */}
                <section className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center shrink-0">
                            <FiShield size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">2. Garantía de Productos</h2>
                    </div>
                    <div className="text-gray-600 space-y-4 leading-relaxed">
                        <p>
                            Todos nuestros equipos cuentan con una <strong>garantía oficial de 6 a 12 meses</strong> dependiendo del fabricante y el modelo, contados a partir de la fecha de facturación.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>La garantía cubre exclusivamente defectos de fabricación.</li>
                            <li>No cubre daños ocasionados por golpes, humedad, inmersión en agua o uso indebido.</li>
                            <li>Cualquier intento de modificación de software (root, jailbreak) anulará inmediatamente la garantía.</li>
                        </ul>
                    </div>
                </section>

                {/* Sección 3 */}
                <section className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-md flex items-center justify-center shrink-0">
                            <FiRefreshCcw size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">3. Cambios y Devoluciones</h2>
                    </div>
                    <div className="text-gray-600 space-y-4 leading-relaxed">
                        <p>
                            Tienes un plazo de <strong>10 días corridos</strong> desde la recepción del producto para solicitar una devolución o cambio directo si no estás satisfecho con tu compra.
                        </p>
                        <p>
                            El equipo debe ser devuelto en sus <strong>condiciones originales</strong>, sin marcas de uso, con sus plásticos protectores intactos y dentro de su caja original con todos los manuales y accesorios. Los costos de envío por devoluciones no por fallas corren a cargo del comprador.
                        </p>
                    </div>
                </section>

                {/* Sección 4 */}
                <section className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-md flex items-center justify-center shrink-0">
                            <FiHelpCircle size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">4. Envíos y Entregas</h2>
                    </div>
                    <div className="text-gray-600 space-y-4 leading-relaxed">
                        <p>
                            Realizamos envíos a todo el país. Los tiempos de entrega estimados se calculan en el checkout y comienzan a correr una vez que el pago ha sido aprobado.
                        </p>
                        <p>
                            Es responsabilidad del cliente proporcionar una dirección exacta y asegurar que haya alguien mayor de 18 años para recibir el paquete. En caso de que el paquete regrese a nuestro depósito por imposibilidad de entrega, se deberá abonar un nuevo envío.
                        </p>
                    </div>
                </section>

                <div className="bg-gray-50 p-6 rounded-lg text-center mt-8 border border-gray-200">
                    <p className="text-gray-600 text-sm">
                        Última actualización: Noviembre 2026. <br className="md:hidden" />
                        Si tienes dudas sobre nuestras políticas, contáctanos a soporte@celularesbaratos.com.
                    </p>
                </div>
            </div>
        </div>
    );
};
