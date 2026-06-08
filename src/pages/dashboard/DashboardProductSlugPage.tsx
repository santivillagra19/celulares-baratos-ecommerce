import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { FormProduct } from "../../components/dashboard"
import { useProduct } from "../../hooks/products/useProduct"

export const DashboardProductSlugPage = () => {
    const { slug } = useParams<{slug: string}>();
    const { product, isLoading } = useProduct(slug || '');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <div className="p-8 text-center">Cargando producto...</div>;
    if (!product) return <div className="p-8 text-center text-red-500">Producto no encontrado</div>;

    return (
        <div>
            <FormProduct productToEdit={product} />
        </div>
    )
}