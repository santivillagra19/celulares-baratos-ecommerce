import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsChatLeftText } from "react-icons/bs";
import { CustomSelect } from "./CustomSelect";
import { useMemo, useState, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GridImages } from "../components/one-product/GridImages";
import { ProductDescription } from "../components/one-product/ProductDescription";
import { useProduct } from "../hooks/products/useProduct";
import type { VariantProduct } from "../interfaces";

interface Acc {
    [key: string]: {
        name: string,
        storages: string[]
    }
}

export const CellPhonePage = () => {
    // const [selectedStorage, setSelectedStorage] = useState("256GB");
    const { slug } = useParams<{ slug: string }>();
    const { product, isLoading, isError } = useProduct(slug || '');

    const [selectedColor, setSelectedColor] = useState<string | null>(
        null
    );

    const [selectedStorage, setSelectedStorage] = useState<string | null>(
        null
    );

    const [selectedVariant, setSelectedVariant] = useState<VariantProduct | null>(
        null
    );

    const colors = useMemo(() => {
        return product?.variants?.reduce((acc: Acc, variant: VariantProduct) => {
            const { color, color_name, storage } = variant
            if (!acc[color]) {
                acc[color] = {
                    name: color_name,
                    storages: []
                };
            }

            if (!acc[color].storages.includes(storage)) {
                acc[color].storages.push(storage);
            }

            return acc;
        }, {} as Acc) || {};
    }, [product?.variants]);


    return <div>

        <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
            <div>
                Galeria de imagenes
                <GridImages images={[]} />
            </div>

            <div className="flex-1 space-y-5">
                <h1 className="text-3xl font-bold tracking-tight">
                    Samsung Galaxy S23 Ultra 5G - 256GB
                </h1>

                <div className="flex gap-5 items-center">
                    <span className="tracking-wide text-lg">
                        {formatPrice(1599999)}
                    </span>

                    <div className="relative">
                        <span>Agotado</span>
                    </div>
                </div>

                <Separator />

                <ul className="space-y-2 ml-7 my-10">
                    <li className="text-sm flex items-center gap-2 tracking-tight font-medium">
                        <span className="bg-black w-[5px] h-[5px] rounded-full"></span>
                        256GB de almacenamiento
                    </li>
                </ul>

                <div className="flex flex-col gap-3">
                    <p>
                        Color: Azul
                    </p>
                    <div className="flex gap-3">
                        <button
                            className={`w-8 h-8 rounded-full flex justify-center items-center ${true ?
                                'border border-slate-800' : ''
                                }`}
                        >
                            <span
                                className="w-[26px] h-[26px] rounded-full"
                                style={{ backgroundColor: 'blue' }}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium">
                        Almacenamiento disponible
                    </p>

                    <div className="flex gap-3">
                        <CustomSelect
                            options={storageOptions}
                            selected={selectedStorage}
                            onChange={setSelectedStorage}
                        />
                    </div>
                </div>

                {
                    false ? (
                        <button disabled className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs 
                        py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full">
                            Agotado
                        </button>
                    ) : (
                        <>
                            <div className="space-y-3">
                                <p className="text-sm font-medium">
                                    Cantidad:
                                </p>

                                <div className="flex gap-8 px-5 border border-slate-200 w-fit rounded-full">
                                    <button className="">
                                        <LuMinus size={15} />
                                    </button>
                                    <span className="text-slate-500 text-sm">
                                        1
                                    </span>
                                    <button>
                                        <LuPlus size={15} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs 
                        py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] cursor-pointer w-full">
                                    Agregar al carrito
                                </button>
                                <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs 
                                rounded-full py-4 cursor-pointer w-full hover:bg-slate-900 transition-all duration-300">
                                    Comprar ahora
                                </button>
                            </div>
                        </>
                    )
                }

                <div className="grid grid-cols-2 pt-2 gap-4 mt-6">
                    <div className="flex flex-col gap-2 p-2 flex-1 items-center justify-center">
                        <CiDeliveryTruck size={35} />
                        <p className="text-xs font-semibold text-center">Envío gratis a todo el país</p>
                    </div>

                    <Link to="#" className="flex flex-col gap-2 p-2 items-center justify-center">
                        <BsChatLeftText size={30} />
                        <div className="text-center">
                            <p className="text-xs font-bold">¿Necesitas ayuda?</p>
                            <p className="text-[10px] text-slate-500 cursor-pointer hover:underline">Contáctanos aquí</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

        <ProductDescription />
    </div>
};