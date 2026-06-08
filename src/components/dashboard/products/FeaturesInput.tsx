import { useFieldArray } from "react-hook-form";
import type { FieldErrors, Control, UseFormRegister } from "react-hook-form";
import type { ProductFormInput } from "../../../lib/validators";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface FeaturesInputProps {
    control: Control<ProductFormInput>;
    register: UseFormRegister<ProductFormInput>;
    errors: FieldErrors<ProductFormInput>;
}

export const FeaturesInput = ({ control, register, errors }: FeaturesInputProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "features",
    });

    return (
        <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Características destacadas</h3>
                    <p className="text-gray-500 text-sm">Agrega características breves del producto (ej. "Pantalla OLED de 6.7 pulgadas").</p>
                </div>
                <button 
                    type="button" 
                    onClick={() => append({ value: '' })}
                    className="flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <HiOutlinePlus size={20} />
                    Agregar Característica
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start">
                        <div className="flex-1 flex flex-col gap-1">
                            <input 
                                {...register(`features.${index}.value`)} 
                                placeholder="Ej. Cámara principal de 48MP"
                                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all font-medium w-full"
                            />
                            {errors.features?.[index]?.value && <span className="text-red-500 text-xs font-semibold">{errors.features[index]?.value?.message}</span>}
                        </div>
                        <button 
                            type="button" 
                            onClick={() => remove(index)}
                            className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-100 transition-colors shadow-sm mt-0.5"
                        >
                            <HiOutlineTrash size={20} />
                        </button>
                    </div>
                ))}
                {fields.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-xl">
                        No hay características agregadas. Presiona el botón para agregar una.
                    </p>
                )}
            </div>
        </div>
    );
};
