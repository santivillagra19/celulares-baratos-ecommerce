import type { PreparedProducts } from "../../interfaces"
import { CardProduct } from "../products/CardProduct"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

interface Props {
    title: string,
    products: PreparedProducts[]
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

export const ProductGrid = ({ title, products }: Props) => {
    return <div className="my-32">
        <h2 className="text-3xl font-semibold text-center mb-10 md:text-4xl lg:text-5xl">
            {title}
        </h2>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 gap-y-8 grid-col-1 sm:grid-cols-2 lg:grid-cols-4"
        >
            {
                products.map((product) => (
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
                ))
            }
        </motion.div>
    </div>
}