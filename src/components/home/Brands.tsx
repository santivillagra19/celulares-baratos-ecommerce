const brands = [
    {
        image: '/images/brands/Apple-Logo.webp',
        alt: 'Apple'
    },
    {
        image: '/images/brands/honor-logo.png',
        alt: 'Honor'
    },
    {
        image: '/images/brands/huawei-logo.png',
        alt: 'Huawei'
    },
    {
        image: '/images/brands/realme-logo.webp',
        alt: 'Realme'
    },
    {
        image: '/images/brands/Samsung_Logo.webp',
        title: 'Samsung'
    },
    {
        image: '/images/brands/xiaomi-logo.webp',
        title: 'Xiaomi'
    }
]

import { motion } from "framer-motion"

export const Brands = () => {
    return <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center gap-3 pt-16 pb-12"
    >
        <h2 className="font-bold text-2xl">
            Marcas que disponemos
        </h2>

        <p className="w-2/3 text-center text-sm md:text-base text-gray-600">
            Tenemos lo mas moderno en tecnología y los últimos modelos de celulares disponibles
        </p>

        <div className="grid grid-cols-3 gap-3 mt-8 items-center md:grid-cols-6">
            {
                brands.map((brand, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={brand.image}
                            alt={brand.alt || brand.title}
                            className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                        />
                    </motion.div>
                ))
            }
        </div>
    </motion.div>
}