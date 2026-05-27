import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/products/useProducts";
import { useDeleteProduct } from "../../../hooks/products/useDeleteProduct";
import { ProductGridSkeleton } from "../../skeletons/ProductGridSkeleton";
import { formatPrice } from "../../../helpers";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

const tableHeaders = [
    '',
    'Nombre',
    'Variante',
    'Precio',
    'Stock',
    'Fecha de creación',
    '',
]

export const TableProduct = () => { 
    const [page, setPage] = useState(1);
    const { products, isLoading, totalProducts } = useProducts({ page });
    const { deleteProduct, isDeleting } = useDeleteProduct();

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`¿Estás seguro que deseas eliminar "${name}"? Esta acción no se puede deshacer.`)) {
            deleteProduct(id);
        }
    };

    if (isLoading) return <ProductGridSkeleton />;

    if (!products) {
        return <LuLoader className="animate-spin text-gray-500 mx-auto mt-10" size={32} />
    }

    return (
        <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
            <h1 className="font-bold text-xl">
                Tabla de productos
            </h1>

            <p className="text-sm mt-1 mb-8 font-regular text-gray-500">
                Gestiona tus productos y mira las estadísticas de cada uno de ellos
            </p>

            <div className="relative w-full overflow-auto">
                <table className="text-sm w-full caption-bottom">
                    <thead className="border-b border-gray-200">
                        <tr className="text-sm font-bold">
                            {
                                tableHeaders.map((header, index) => (
                                    <th key={index} className="h-12 px-4 text-left text-gray-600">
                                        {header}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100"> 
                        {
                            products?.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 align-middle">
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name} 
                                            className="w-16 h-16 aspect-square rounded-md object-contain border border-gray-100"
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-slate-700">
                                        {product.name}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        <select className="border border-gray-300 rounded p-1">
                                        {
                                            product.variants.map((variant, variantIndex) => (
                                                <option 
                                                    key={variant.id}
                                                    value={variantIndex}
                                                >
                                                    {variant.color_name} - {variant.storage}
                                                </option>
                                            ))
                                        }
                                        </select>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {formatPrice(product.variants[0]?.price)}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {product.variants[0]?.stock} 
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex gap-3 justify-end">
                                            <Link 
                                                to={`/dashboard/products/${product.id}/edit`} 
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Editar
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(product.id, product.name)}
                                                disabled={isDeleting}
                                                className={`text-red-600 hover:text-red-800 font-medium ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {products?.length === 0 && (
                    <p className="p-10 text-center text-gray-500">No hay productos registrados.</p>
                )}
            </div>
        </div>
    );
};