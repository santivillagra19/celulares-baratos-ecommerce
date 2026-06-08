import { motion } from "framer-motion"

export const AboutPage = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 pt-24"
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center text-4xl font-semibold tracking-tight mb-5"
            >
                Nuestra empresa
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="overflow-hidden rounded-2xl shadow-sm mx-4 md:mx-0"
            >
                <img className="h-[300px] md:h-[500px] w-full object-cover hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWRpZmljaW8lMjBkZSUyMGxhJTIwZW1wcmVzYXxlbnwwfHwwfHx8MA%3D%3D" alt="Imagen de fondo" />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-4 tracking-tighter leading-7 text-base font-medium text-slate-800 pb-10 max-w-4xl mx-auto px-4"
            >
                <p className="text-gray-600">
                    CelularesBaratos es una tienda en línea que se dedica a la
                    Venta de celulares, fundada en 2021. Nuestro objetivo es
                    ofrecer a nuestros clientes la mejor calidad y precio en
                    celulares. Contamos con un equipo de profesionales que se
                    encargan de seleccionar los mejores productos para ti.
                </p>

                <p className="text-gray-600">
                    En CelularesBaratos podrás encontrar una amplia variedad de
                    celulares de las mejores marcas. Además, contamos con
                    promociones y descuentos exclusivos para que puedas comprar
                    tu celular al mejor precio.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-8 mb-4 text-black">
                    No esperes más, y compra tu celular en CelularesBaratos.
                </h2>

                <p className="text-gray-600">
                    Para más información, no dudes en ponerte en contacto con nosotros, a través de nuestro correo electrónico
                    <a className="ml-1 text-blue-600 hover:underline" href="mailto:correo@celularesbaratos.com">correo@celularesbaratos.com</a> o llamando al
                    <a className="ml-1 text-blue-600 hover:underline" href="tel:33333333333">tel: 333 3333 3333</a>
                </p>
            </motion.div>
        </motion.div>
    )
}