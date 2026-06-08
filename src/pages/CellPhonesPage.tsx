import { useEffect, useState } from "react"
import { CardProduct } from "../components/products/CardProduct"
import { ContainerFilter } from "../components/products/ContainerFilter"
import { prepareProducts } from "../helpers"
import { useFilteredProducts } from "../hooks"
import { Pagination } from "../components/shared/Pagination"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.4, ease: "easeOut" } 
    }
};

export const CellPhonesPage = () => {

    const [page, setPage] = useState(1);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    useEffect(() => {
        setPage(1);
    }, [selectedBrands]);

    const {
        data: products = [],
        isLoading,
        totalProducts

    } = useFilteredProducts({
        page,
        brands: selectedBrands,
    });

    const preparedProducts = prepareProducts(products)

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl font-semibold text-center mb-12 pt-20 tracking-tight"
            >
                Celulares
            </motion.h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] md:gap-10 lg:gap-12 lg:grid-cols-3 xl:grid-cols-5 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ContainerFilter
                        setSelectedBrands={setSelectedBrands}
                        selectedBrands={selectedBrands}
                    />
                </motion.div>

                {
                    isLoading ? (
                        <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-4 flex items-center justify-center h-[500px]">
                            <p className="text-2xl font-medium text-gray-500 animate-pulse">Cargando...</p>
                        </div>
                    ) : (
                        <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4"
                            >
                                {
                                    preparedProducts.map(product => (
                                        <motion.div key={product.id} variants={itemVariants}>
                                            <CardProduct
                                                productId={product.id}
                                                name={product.name}
                                                price={product.price}
                                                colors={product.colors}
                                                img={product.images[0]}
                                                slug={product.slug}
                                                variants={product.variants}
                                            />
                                        </motion.div>
                                    ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Pagination
                                    totalItems={totalProducts}
                                    page={page}
                                    setPage={setPage}
                                />
                            </motion.div>
                        </div>
                    )}
            </div>
        </motion.div>
    )
}