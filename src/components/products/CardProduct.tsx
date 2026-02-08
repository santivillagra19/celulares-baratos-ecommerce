import { useState } from "react"
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

    const [activeColor, setActiveColor] = useState<{
        name: string,
        color: string,
    }>(colors[0] || null);

    const selectedVariant = variants.find(
        variant => variant.color === activeColor?.color || variant.color === activeColor?.name
    ) || variants[0];

    const stock = selectedVariant?.stock ?? 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        // 1. MAGIA: Evita que el Link se active y cambie de página
        e.preventDefault();
        e.stopPropagation();

        if (stock === 0) return;

        if (selectedVariant) {
            addToCart({
                variantId: selectedVariant.id,
                productId: productId,
                name: name,
                image: img,
                price: selectedVariant.price, // Usamos el precio real de la variante
                quantity: 1,
                color: activeColor.name,
                storage: selectedVariant.storage,
            });

            toast.success("Agregado al carrito");
            openSheet('cart'); // Opcional: abre el carrito automáticamente
        }
    };

    const addToCart = useCartStore(state => state.addToCart);
    const openSheet = useGlobalStore(state => state.openSheet);

    return <div className="flex flex-col gap-6 relative">
        <Link to={`/celulares/${slug}`} className="flex relative group overflow-hidden">
            <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                <img
                    src={img}
                    alt={name}
                    className="object-contain h-full w-full"
                />
            </div>

            <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className="bg-white border border-slate-200 absolute w-full bottom-0 py-2 rounded-3xl flex 
            items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 translate-y-full transition-all
            duration-300 group-hover:translate-y-0 cursor-pointer"
            >
                <FiPlus>
                    {stock === 0 ? 'Sin Stock' : 'Añadir'}
                </FiPlus>
            </button>
        </Link>

        <div className="flex flex-col gap-1 items-center">
            <p className="text-[15px] font-medium">
                {name}
            </p>
            <p className="text-[15px] font-medium">
                {formatPrice(price)}
            </p>

            {/* AGREGAR ESTO: Feedback visual del almacenamiento */}
            {selectedVariant?.storage && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {selectedVariant.storage}
                </span>
            )}

            <div className="flex gap-2 py-1">
                {
                    colors.map((color) => (
                        <span
                            key={color.color}
                            onClick={() => setActiveColor(color)}
                            className={`
                grid place-items-center w-5 h-5 rounded-full cursor-pointer transition-all
                ${activeColor?.color === color.color
                                    ? 'ring-2 ring-offset-2 ring-slate-800'
                                    : 'hover:scale-110'
                                }
            `}
                        >
                            <span className="w-3.5 h-3.5 rounded-full "
                                style={{
                                    backgroundColor: color.color
                                }}
                            />
                        </span>
                    ))
                }
            </div>
        </div>

        <div className="absolute top-2 left-2">
            {
                stock === 0 && <Tag contentTag='agotado' />
            }
        </div>
    </div>
}