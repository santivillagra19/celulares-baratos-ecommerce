import { BiWorld } from "react-icons/bi"
import { FaHammer } from "react-icons/fa6"
import { HiMiniReceiptRefund } from "react-icons/hi2"
import { MdLocalShipping } from "react-icons/md"

export const FeatureGrid = () => {
    return <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
        <div className="flex items-center gap-6">
            <MdLocalShipping size={40} className="text-slate-600"></MdLocalShipping>

            <div className="space-y-1">
                <p className="semi-bold">
                    Envío gratis
                </p>
                <p className="font-sm">
                    En todos nuestros productos
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <HiMiniReceiptRefund size={40} className="text-slate-600"></HiMiniReceiptRefund>

            <div className="space-y-1">
                <p className="semi-bold">
                    Devoluciones
                </p>
                <p className="font-sm">
                    Devuelve el equipo si no te satisface la compra dentro de 72hs
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <FaHammer size={40} className="text-slate-600"></FaHammer>

            <div className="space-y-1">
                <p className="semi-bold">
                    Soporte 24/7
                </p>
                <p className="font-sm">
                    Soporte técnico en cualquier momento
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <BiWorld size={40} className="text-slate-600"></BiWorld>

            <div className="space-y-1">
                <p className="semi-bold">
                    Garantía
                </p>
                <p className="font-sm">
                    Garantía de 1 año en todos los equipos
                </p>
            </div>
        </div>
    </div>
}