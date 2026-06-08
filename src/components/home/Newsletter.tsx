
export const Newsletter = () => {
    return <div className="relative bg-gray-500 text-white py-20">
        <div
            className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
            style={{ backgroundImage: "url(/images/background-newsletter.webp)" }}
        />

        <div className="container mx-auto z-10 relative p-5 md:p-0 flex justify-center">
            <div className="w-full text-black bg-white p-12 rounded-2xl shadow-xl space-y-5 md:w-[70%] lg:w-[50%] text-center flex flex-col items-center">
                <p className="text-sm uppercase font-bold tracking-wider text-gray-800">
                    Suscríbete a nuestro boletín y recibe promociones
                </p>

                <p className="text-sm text-gray-500 font-medium w-[80%] leading-relaxed">
                    Introduzca su correo para recibir ofertas exclusivas y novedades de nuestros celulares.
                </p>
                <form className="flex flex-col gap-4 w-full xl:flex-row mt-4">
                    <input
                        type="email"
                        className="border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full py-3.5 px-6
                    w-full text-sm font-medium bg-gray-50 transition-all"
                        placeholder="Correo electrónico"
                    />

                    <button className="bg-black hover:bg-gray-800 text-white font-bold rounded-full uppercase tracking-wider
                    py-3.5 px-8 text-sm transition-colors shadow-lg">
                        Suscribirme
                    </button>
                </form>
            </div>
        </div>
    </div>
}