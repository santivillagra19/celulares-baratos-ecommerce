import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";

export const CellPhonePage = () => {
    return <div>
        <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
            <div>
                Galeria de imagenes
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
                        <select className="border border-gray-300 rounded-lg px-3 py-1">
                            <option value="">256GB</option>
                        </select>
                    </div>
                </div>

                {
                    true ? (
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
                        py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2]">
                                    Agregar al carrito
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </div>
};