import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Banner = () => {
    return <div className="relative bg-gray-900 text-white overflow-hidden">
        <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center h-full"
            style={{ backgroundImage: "url(/images/img-banner.jpg)" }}
        />

        <div className="absolute inset-0 bg-black opacity-50 " />

        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8" >
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-extrabold mb-4 lg:text-6xl tracking-tight"
            >
                Tecnología premium. <br className="hidden md:block" />
                <span className="text-blue-400">Precios inteligentes.</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg mb-8 lg:text-xl max-w-2xl text-gray-200 font-medium"
            >
                Descubrí los mejores equipos con garantía, cuotas y envío gratis a todo el país. Tu próximo celular está acá.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Link to='/celulares' className="bg-gray-900 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg
                shadow-lg transition duration-300 ease-in-out">
                    Ver celulares
                </Link>
            </motion.div>
        </div>
    </div>
}