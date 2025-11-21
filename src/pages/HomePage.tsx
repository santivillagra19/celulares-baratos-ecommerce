import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/Product.Grid"
import { prepareProducts } from "../helpers"
import { useHomeProducts } from "../hooks/products/useHomeProducts"

export const HomePage = () => {

    const { recentProducts, popularProducts, isLoading, isError } = useHomeProducts();

    const preparedRecentProducts = prepareProducts(recentProducts)
    const preparedPopularProducts = prepareProducts(popularProducts)

    return (
        <div>
            <FeatureGrid />

            <ProductGrid
                title="Nuevos productos"
                products={preparedRecentProducts}
            />
            <ProductGrid
                title="Productos destacados"
                products={preparedPopularProducts}
            />

            <Brands />
        </div>
    )
}