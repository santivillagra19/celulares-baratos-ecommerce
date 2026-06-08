import { useProducts } from "../../../hooks/products/useProducts";
import { useDeleteProduct } from "../../../hooks/products/useDeleteProduct";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { Pagination } from "../../shared/Pagination";
import { CellTableContent } from "./CellTableContent";

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

    if (isLoading || !products) {
        return (
            <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white items-center justify-center min-h-[400px]">
                <LuLoader className="animate-spin text-blue-500 mb-4" size={48} />
                <p className="text-gray-500 font-medium animate-pulse">Cargando catálogo de productos...</p>
            </div>
        );
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
                                <CellTableContent 
                                    key={product.id} 
                                    product={product} 
                                    handleDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            ))
                        }
                    </tbody>
                </table>

                {products?.length === 0 && (
                    <p className="p-10 text-center text-gray-500">No hay productos registrados.</p>
                )}
            </div>

            <Pagination 
                page={page}
                setPage={setPage}
                totalItems={totalProducts}
            />
        </div>
    );
};