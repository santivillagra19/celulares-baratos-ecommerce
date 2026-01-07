import { useEffect } from "react"
import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/Product.Grid"
import { prepareProducts } from "../helpers"
import { useHomeProducts } from "../hooks/products/useHomeProducts"
import { toast } from 'sonner'
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton"

export const HomePage = () => {

    const { recentProducts, popularProducts, isLoading, isError } = useHomeProducts();

    const preparedRecentProducts = prepareProducts(recentProducts)
    const preparedPopularProducts = prepareProducts(popularProducts)

    useEffect(() => {
        if (isError) {
            toast.error('Hubo un problema al cargar los productos')
        };
    }, [isError])

    if (isError) return <div>Error cargando productos</div>

    return (
        <div>
            <FeatureGrid />

            {
                isLoading ? (
                    <ProductGridSkeleton numberOfProducts={4} />
                ) : (
                    <ProductGrid
                        title="Nuevos productos"
                        products={preparedRecentProducts}
                    />
                )}

            {
                isLoading ? (
                    <ProductGridSkeleton numberOfProducts={4} />
                ) : (
                    <ProductGrid
                        title="Productos destacados"
                        products={preparedPopularProducts}
                    />
                )}

            <Brands />
        </div>
    )
} 