import { BiWorld } from "react-icons/bi"
import { FaHammer } from "react-icons/fa6"
import { HiMiniReceiptRefund } from "react-icons/hi2"
import { MdLocalShipping } from "react-icons/md"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: "easeOut" } 
    }
};

export const FeatureGrid = () => {
    return <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5"
    >
        <motion.div variants={itemVariants} className="flex items-center gap-6">
            <MdLocalShipping size={40} className="text-slate-600"></MdLocalShipping>

            <div className="space-y-1">
                <p className="semi-bold font-semibold">
                    Envío gratis
                </p>
                <p className="font-sm text-sm text-gray-600">
                    En todos nuestros productos
                </p>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-6">
            <HiMiniReceiptRefund size={40} className="text-slate-600"></HiMiniReceiptRefund>

            <div className="space-y-1">
                <p className="semi-bold font-semibold">
                    Devoluciones
                </p>
                <p className="font-sm text-sm text-gray-600">
                    Devuelve el equipo si no te satisface en 72hs
                </p>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-6">
            <FaHammer size={40} className="text-slate-600"></FaHammer>

            <div className="space-y-1">
                <p className="semi-bold font-semibold">
                    Soporte 24/7
                </p>
                <p className="font-sm text-sm text-gray-600">
                    Soporte técnico en cualquier momento
                </p>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-6">
            <BiWorld size={40} className="text-slate-600"></BiWorld>

            <div className="space-y-1">
                <p className="semi-bold font-semibold">
                    Garantía
                </p>
                <p className="font-sm text-sm text-gray-600">
                    Garantía de 1 año en todos los equipos
                </p>
            </div>
        </motion.div>
    </motion.div>
}