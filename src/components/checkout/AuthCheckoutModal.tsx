import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthCheckoutModal = ({ isOpen, onClose }: Props) => {
    const closeSheet = useGlobalStore(state => state.closeSheet);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="relative bg-white rounded-md shadow-2xl p-6 md:p-8 w-full max-w-md z-10 overflow-hidden"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <IoMdClose size={24} />
                    </button>

                    <div className="text-center mb-8 mt-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Para continuar tu compra</h2>
                        <p className="text-gray-500 text-sm">Necesitás ingresar a tu cuenta para que podamos registrar tu pedido correctamente.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link 
                            to="/login"
                            onClick={() => {
                                onClose();
                                closeSheet();
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md text-center transition-all shadow-md hover:shadow-lg"
                        >
                            Iniciar sesión
                        </Link>
                        
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">o</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <Link 
                            to="/register"
                            onClick={() => {
                                onClose();
                                closeSheet();
                            }}
                            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold py-4 px-6 rounded-md text-center transition-all"
                        >
                            Crear una cuenta nueva
                        </Link>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
