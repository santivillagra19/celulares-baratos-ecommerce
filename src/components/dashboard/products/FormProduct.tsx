import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "../../../lib/validators";
import { useCreateProduct } from "../../../hooks/products/useCreateProduct";
import { useUpdateProduct } from "../../../hooks/products/useUpdateProduct";
import { useProduct } from "../../../hooks/products/useProduct";
import { TiptapEditor } from "../../shared/TiptapEditor";
import { FeaturesInput } from "./FeaturesInput";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineUpload } from "react-icons/hi";

export const FormProduct = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const isEditMode = !!slug;

    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const { product, isLoading: isLoadingProduct } = useProduct(slug || '');

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    
    const isPending = isCreating || isUpdating;
    
    const { register, handleSubmit, control, setValue, getValues, reset, formState: { errors } } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            brand: '',
            slug: '',
            description: undefined as unknown as import('@tiptap/react').JSONContent,
            images: [],
            features: [],
            variants: [{ color_name: '', storage: '', price: 0, stock: 0 }],
        }
    });

    useEffect(() => {
        if (isEditMode && product) {
            reset({
                name: product.name,
                brand: product.brand,
                slug: product.slug,
                description: product.description as any,
                images: product.images || [],
                features: (product.features || []).map(f => ({ value: f })),
                variants: product.variants || [],
            });
            setImagePreviews((product.images as string[]) || []);
        }
    }, [isEditMode, product, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    const onSubmit = (data: ProductFormValues) => {
        const formattedData = {
            ...data,
            features: data.features.map(f => f.value),
            description: data.description as unknown as import('../../../supabase/supabase').Json, // Parseado a Json
        };
        
        if (isEditMode && product) {
            updateProduct({ id: product.id, data: formattedData });
        } else {
            createProduct(formattedData);
        }
    };

    if (isEditMode && isLoadingProduct) {
        return <div className="p-8 text-center text-gray-500 font-semibold mt-10">Cargando información del producto...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Editar producto' : 'Crear nuevo producto'}</h2>
                <p className="text-gray-500 text-sm mt-1">{isEditMode ? 'Modifica los detalles del equipo a continuación.' : 'Completa los detalles generales del equipo a continuación.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Nombre del producto</label>
                    <input 
                        {...register('name')} 
                        placeholder="Ej. iPhone 15 Pro Max"
                        className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all font-medium"
                    />
                    {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Marca</label>
                    <input 
                        {...register('brand')} 
                        placeholder="Ej. Apple"
                        className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all font-medium"
                    />
                    {errors.brand && <span className="text-red-500 text-xs font-semibold">{errors.brand.message}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Slug</label>
                <input 
                    {...register('slug')} 
                    placeholder="ej. iphone-15-pro-max"
                    className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all font-medium"
                />
                {errors.slug && <span className="text-red-500 text-xs font-semibold">{errors.slug.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Descripción detallada</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TiptapEditor value={field.value} onChange={field.onChange} />
                    )}
                />
                {errors.description && <span className="text-red-500 text-xs font-semibold">{((errors.description as unknown) as { message: string }).message}</span>}
            </div>

            <FeaturesInput control={control} register={register} errors={errors} />

            {/* SECCIÓN DE IMÁGENES */}
            <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Imágenes del producto</h3>
                        <p className="text-gray-500 text-sm">Sube imágenes de alta calidad para mostrar tu producto.</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all hover:border-blue-400 group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <HiOutlineUpload className="w-10 h-10 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-blue-600">Haz clic para subir</span> o arrastra y suelta</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple accept="image/*" onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                const newPreviews = files.map(file => URL.createObjectURL(file));
                                setImagePreviews(prev => [...prev, ...newPreviews]);
                                
                                const currentImages = getValues('images') || [];
                                setValue('images', [...currentImages, ...files], { shouldValidate: true });
                            }} />
                        </label>
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setImagePreviews(prev => prev.filter((_, i) => i !== index));
                                                const currentImages = getValues('images') || [];
                                                setValue('images', currentImages.filter((_, i) => i !== index), { shouldValidate: true });
                                            }}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm transform scale-75 group-hover:scale-100"
                                        >
                                            <HiOutlineTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* SECCIÓN DE VARIANTES */}
            <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Variantes del producto</h3>
                        <p className="text-gray-500 text-sm">Agrega colores, almacenamiento, precio y stock.</p>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => append({ color_name: '', storage: '', price: 0, stock: 0 })}
                        className="flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <HiOutlinePlus size={20} />
                        Agregar Variante
                    </button>
                </div>

                {errors.variants?.root && <p className="text-red-500 text-sm mb-4 font-semibold">{errors.variants.root.message}</p>}

                <div className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 relative group">
                            {fields.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => remove(index)}
                                    className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <HiOutlineTrash size={18} />
                                </button>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Color</label>
                                    <input 
                                        {...register(`variants.${index}.color_name`)} 
                                        placeholder="Ej. Titanio Natural"
                                        className="p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                                    />
                                    {errors.variants?.[index]?.color_name && <span className="text-red-500 text-xs font-semibold">{errors.variants[index]?.color_name?.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Almacenamiento</label>
                                    <input 
                                        {...register(`variants.${index}.storage`)} 
                                        placeholder="Ej. 256GB"
                                        className="p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                                    />
                                    {errors.variants?.[index]?.storage && <span className="text-red-500 text-xs font-semibold">{errors.variants[index]?.storage?.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Precio ($)</label>
                                    <input 
                                        type="number"
                                        {...register(`variants.${index}.price`)} 
                                        placeholder="0"
                                        className="p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                                    />
                                    {errors.variants?.[index]?.price && <span className="text-red-500 text-xs font-semibold">{errors.variants[index]?.price?.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</label>
                                    <input 
                                        type="number"
                                        {...register(`variants.${index}.stock`)} 
                                        placeholder="0"
                                        className="p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                                    />
                                    {errors.variants?.[index]?.stock && <span className="text-red-500 text-xs font-semibold">{errors.variants[index]?.stock?.message}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-4 mt-2">
                <button 
                    type="button"
                    onClick={() => navigate('/dashboard/productos')}
                    className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-8 rounded-xl transition-all border border-gray-200 shadow-sm text-center"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/30 ${isPending ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                    {isPending ? 'Guardando...' : 'Continuar y Guardar'}
                </button>
            </div>
        </form>
    );
};