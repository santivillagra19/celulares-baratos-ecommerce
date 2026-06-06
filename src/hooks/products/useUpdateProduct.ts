import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProduct } from "../../actions";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { ProductInput } from "../../interfaces";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate,
        isPending
    } = useMutation({
        mutationFn:
         async ({id, data}: {id: string, data: ProductInput}) => updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
            toast.success('Producto actualizado correctamente', {position: 'bottom-right'});
            navigate('/dashboard/productos');
        },
        onError: () => {
            toast.error('Error al actualizar el producto', {position: 'bottom-right'});
        }
    })

    return {
        mutate, 
        isPending
    };
}