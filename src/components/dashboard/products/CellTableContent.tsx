import { Link } from "react-router-dom";
import { formatPrice } from "../../../helpers";
import { useState } from "react";
import type { Product } from "../../../interfaces";

interface CellTableContentProps {
    product: Product;
    handleDelete: (id: string, name: string) => void;
    isDeleting: boolean;
}

export const CellTableContent = ({ 
    product, 
    handleDelete, 
    isDeleting 
}: CellTableContentProps) => {
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 align-middle">
                <img 
                    src={product.images[0] || 'https://ui.shadcn.com/placeholder.svg'} 
                    alt={product.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 aspect-square rounded-md object-contain border border-gray-100"
                />
            </td>
            <td className="p-4 font-medium text-slate-700">
                {product.name}
            </td>

            <td className="p-4 font-medium min-w-[140px]">
                <select 
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 transition-colors cursor-pointer hover:bg-gray-100 outline-none shadow-sm"
                    value={selectedVariantIndex}
                    onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                >
                {
                    product.variants.map((variant, index) => (
                        <option 
                            key={variant.id}
                            value={index}
                            className="font-medium"
                        >
                            {variant.color_name} - {variant.storage}
                        </option>
                    ))
                }
                </select>
            </td>
            <td className="p-4 text-gray-600">
                {formatPrice(activeVariant?.price)}
            </td>
            <td className="p-4 text-gray-600">
                {activeVariant?.stock} 
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
    );
};
