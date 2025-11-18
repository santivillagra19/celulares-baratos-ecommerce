import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/Product.Grid"
import { popularCelulares, recentCelulares } from "../data/initialData"
import { prepareProducts } from "../helpers"
import { useProducts } from "../hooks"

export const HomePage = () => {

    const { products, isLoading } = useProducts();

    const preparedRecentProducts = prepareProducts(recentCelulares)
    const popularProducts = prepareProducts(popularCelulares)

    return (
        <div>
            <FeatureGrid />

            <ProductGrid
                title="Nuevos productos"
                products={preparedRecentProducts}
            />
            <ProductGrid
                title="Productos destacados"
                products={popularProducts}
            />

            <Brands />
        </div>
    )
}