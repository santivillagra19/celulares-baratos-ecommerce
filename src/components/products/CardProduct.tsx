import { useState, useMemo } from "react"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import type { VariantProduct } from "../../interfaces"
import { formatPrice } from "../../helpers"
import { Tag } from "../shared/Tag"
import { useCartStore } from "../../store/cart.store"
import { useGlobalStore } from "../../store/global.store"
import { toast } from "sonner"

interface Props {
    productId: string,
    img: string,
    name: string,
    price: number,
    slug: string,
    colors: { name: string, color: string }[],
    variants: VariantProduct[]
}

export const CardProduct = ({
    productId,
    img,
    name,
    price,
    slug,
    colors,
    variants
}: Props) => {

    // 1. Extraer Almacenamientos Únicos (usamos useMemo para no recalcular en cada render)
    const availableStorages = useMemo(() => {
        const storages = variants.map(v => v.storage).filter(Boolean);
        return Array.from(new Set(storages));
    }, [variants]);

    // 2. Estado del Color
    const [activeColor, setActiveColor] = useState<{
        name: string,
        color: string,
    }>(colors[0] || null);

    // 3. Estado del Almacenamiento (Seleccionamos el primero por defecto)
    const [activeStorage, setActiveStorage] = useState<string | null>(availableStorages[0] || null);

    // 4. Lógica de Selección (Cruce de Color + Almacenamiento)
    // Buscamos la variante exacta que coincida con AMBOS criterios
    const exactVariant = variants.find(
        variant =>
            (variant.color === activeColor?.color || variant.color === activeColor?.name) &&
            variant.storage === activeStorage
    );

    // Si no existe la combinación exacta (ej: Rojo de 256GB no existe), 
    // buscamos una variante que tenga al menos el almacenamiento correcto para mostrar el precio bien.
    const displayVariant = exactVariant || variants.find(v => v.storage === activeStorage) || variants[0];

    // Datos dinámicos basados en la selección
    const stock = displayVariant?.stock ?? 0;
    const currentPrice = displayVariant?.price || price;

    const addToCart = useCartStore(state => state.addToCart);
    const openSheet = useGlobalStore(state => state.openSheet);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (stock === 0) return;

        if (displayVariant) {
            addToCart({
                variantId: displayVariant.id,
                productId: productId,
                name: name,
                image: img,
                price: currentPrice,
                quantity: 1,
                color: activeColor?.name || displayVariant.color,
                storage: displayVariant.storage,
            });

            toast.success("Agregado al carrito");
            openSheet('cart');
        }
    };

    return (
        <div className="flex flex-col gap-6 relative group/card">
            <Link to={`/celulares/${slug}`} className="flex relative group overflow-hidden">
                <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                    <img
                        src={img}
                        alt={name}
                        className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className="bg-white border border-slate-200 absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 py-2.5 rounded-3xl flex 
            items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100  transition-all
            duration-300 group-hover:translate-y-0 cursor-pointer z-10 translate-y-20"
                >
                    <FiPlus></FiPlus>
                </button>
            </Link>

            <div className="flex flex-col gap-1 items-center">
                <p className="text-[15px] font-medium text-center truncate px-2 w-full">
                    {name}
                </p>

                <p className="text-[15px] font-bold text-slate-900">
                    {formatPrice(currentPrice)}
                </p>

                {/* SELECTOR DE ALMACENAMIENTO (NUEVO) */}
                {availableStorages.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                        {availableStorages.map((storage) => (
                            <button
                                key={storage}
                                onClick={() => setActiveStorage(storage)}
                                className={`
                                    text-xs px-2.5 py-1 rounded border transition-all duration-200
                                    ${activeStorage === storage
                                        ? 'bg-slate-800 text-white border-slate-800 shadow-sm' // Activo
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400' // Inactivo
                                    }
                                `}
                            >
                                {storage}
                            </button>
                        ))}
                    </div>
                )}

                {/* SELECTOR DE COLORES */}
                <div className="flex gap-2 py-1 mt-1">
                    {colors.map((color) => (
                        <button
                            key={color.color}
                            onClick={() => setActiveColor(color)}
                            className={`
                                grid place-items-center w-6 h-6 rounded-full cursor-pointer transition-all
                                ${activeColor?.color === color.color
                                    ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                                    : 'hover:scale-110 opacity-80 hover:opacity-100'
                                }
                            `}
                            title={color.name}
                        >
                            <span
                                className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                                style={{ backgroundColor: color.color }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="absolute top-2 left-2 pointer-events-none">
                {stock === 0 && <Tag contentTag='agotado' />}
            </div>
        </div>
    )
}