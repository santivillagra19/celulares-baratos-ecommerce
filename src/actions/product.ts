import type { Product, ProductInput } from "../interfaces";
import { supabase } from "../supabase/client"

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

export const deleteProduct = async (id: string) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    return true;
};

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
            const {data, error} = await supabase.storage.from('product-images').upload(`${folderName}/${product.id}-${image.name}`, image)

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

    //  Crear las variantes del producto
    const variants = productInput.variants.map(variant => ({
        product_id: product.id, 
        color_name: variant.color_name,
        color: '#000000', // Valor por defecto ya que la tabla lo requiere
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