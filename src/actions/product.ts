import type { Product, ProductInput } from "../interfaces";
import { supabase } from "../supabase/client"
import {extractFilePath} from "../helpers/index";

export const getProducts = async (page: number = 1) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data: products, error, count } = await supabase
        .from('products')
        .select('*, variants(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    return { products, count };
};

export const getFilteredProducts = async ({
    page = 1,
    brands = []
}: {
    page: number,
    brands: string[]
}) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
        .from('products')
        .select('*, variants(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    if (brands.length > 0) {
        query = query.in('brand', brands)
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return { data, count }
};

export const getRecentProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*,variants(*)')
        .order('created_at', { ascending: false })
        .limit(4);

    if (error) {
        throw new Error(error.message)
    }

    return products;
};

export const getRandomProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*,variants(*)')
        .limit(20);

    if (error) {
        throw new Error(error.message)
    }

    const randomProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, variants(* )')
        .eq('slug', slug)
        .single();

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*,variants(*)').ilike('name', `%${searchTerm}%`); 

    if (error) {
        throw new Error(error.message);
    }

    return data as Product[] || [];
}

//  ADMIN
export const createProduct = async(productInput: ProductInput) => {
    try {
        const {data: product, error:productError} = await supabase.from('products').insert({
            name: productInput.name,
            brand: productInput.brand,
            slug: productInput.slug,
            features: productInput.features,
            description: productInput.description,
            images: [], 
        })
        .select()
        .single()

    if(productError) {
        throw new Error(productError.message);
    }

    const folderName = product.id;

    // Subir las imágenes a Supabase Storage y obtener las URLs públicas
    const uploadedImages = await Promise.all(
        productInput.images.map(async (image) =>{
            if (typeof image === 'string') return image;
            const file = image as File;
            const {data, error} = await supabase.storage.from('product-images').upload(`${folderName}/${product.id}-${file.name}`, file, { upsert: true });

            if(error) {
                throw new Error(error.message);
            }
            
            const imageUrl = `${supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl}`;

            return imageUrl;
        })
    );

    // Actualizar el producto con las URLs de las imágenes subidas
    const {error: updatedError} = await supabase.from('products').update({
        images: uploadedImages,
    }).eq('id', product.id)

    if(updatedError) {
        throw new Error(updatedError.message);
    }

    const variants = productInput.variants.map(variant => ({
        product_id: product.id, 
        color_name: variant.color_name,
        color: variant.color,
        storage: variant.storage,
        price: variant.price,
        stock: variant.stock
    }));

    const {error: variantsError} = await supabase.from('variants').insert(variants)

    if(variantsError) {
        throw new Error(variantsError.message);
    }

    return product;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteProduct = async (id: string) => {
    const {error: variantsError} = await supabase.from('variants').delete().eq('product_id', id);
    
    if(variantsError) {
        throw new Error(variantsError.message);
    }

    const {data: productImages, error: productImageError } = await supabase.from('products').select('images').eq('id', id).single();
    
    if(productImageError) {
        throw new Error(productImageError.message);
    }

    const {error: productDeleteError} = await supabase.from('products').delete().eq('id', id);

    if(productDeleteError) {
        throw new Error(productDeleteError.message);
    }

    if(productImages.images && productImages.images.length > 0) {
        const folderName = id;

        const paths = productImages.images.map((image: string) => {   
            const fileName = image.split('/').pop();
            return `${folderName}/${fileName}`; 
        });

        const { error: storageError } = await supabase.storage.from('product-images').remove(paths);
        
        if (storageError) {
            throw new Error(storageError.message);
        }
    }

    return true;
}

export const updateProduct = async (
    productId: string,
    productInput: ProductInput
) => {
    try {
        const { data: currentProduct, error: currentError } = await supabase
            .from('products')
            .select('images')
            .eq('id', productId)
            .single();

        if (currentError) throw new Error(currentError.message);

        const existingImages = currentProduct.images || [];

        const { data: updatedProduct, error: updatedError } = await supabase
            .from('products')
            .update({
                name: productInput.name,
                brand: productInput.brand,
                slug: productInput.slug,
                features: productInput.features,
                description: productInput.description,
            })
            .eq('id', productId)
            .select()
            .single();

        if (updatedError) throw new Error(updatedError.message);

        const folderName = productId;
        const validImages = productInput.images.filter(image => image);

        const imagesToDelete = existingImages.filter(
            (image: string) => !validImages.includes(image)
        );

        const filesToDelete = imagesToDelete.map(extractFilePath).filter((path): path is string => path !== null);

        if (filesToDelete.length > 0) {
            const { error: deleteImageError } = await supabase.storage
                .from('product-images')
                .remove(filesToDelete);
            
            if (deleteImageError) throw new Error(deleteImageError.message);
        }

        const uploadedImages = await Promise.all(
            validImages.map(async (image) => {
                if (image instanceof File) {
                    const { data, error } = await supabase.storage
                        .from('product-images')
                        .upload(`${folderName}/${productId}-${image.name}`, image, { upsert: true });

                    if (error) throw new Error(error.message);

                    const imageUrl = supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl;

                    return imageUrl;
                } else if (typeof image === 'string') {
                    return image;
                } else {
                    throw new Error('Tipo de imagen no válido');
                }
            })
        );

        const { error: updateImagesError } = await supabase
            .from('products')
            .update({ images: uploadedImages })
            .eq('id', productId);

        if (updateImagesError) throw new Error(updateImagesError.message);

        const existingVariants = productInput.variants.filter(variant => variant.id);
        const newVariants = productInput.variants.filter(variant => !variant.id);
        
        if (existingVariants.length > 0) {
            const { error: updateVariantsError } = await supabase
                .from('variants')
                .upsert(existingVariants.map(variant => ({
                    id: variant.id as string,
                    product_id: productId,
                    stock: variant.stock,
                    price: variant.price,
                    color_name: variant.color_name,
                    storage: variant.storage,
                    color: variant.color,
                })));
         
            if (updateVariantsError) throw new Error(updateVariantsError.message);
        }

        if (newVariants.length > 0) {
            const { error: insertVariantsError } = await supabase
                .from('variants')
                .insert(newVariants.map(variant => ({
                    product_id: productId,
                    stock: variant.stock,
                    price: variant.price,
                    color_name: variant.color_name,
                    storage: variant.storage,
                    color: variant.color,
                })));

            if (insertVariantsError) throw new Error(insertVariantsError.message);
        }

        return updatedProduct;
        
    } catch (error) {
        throw new Error((error as Error).message);
    }
};