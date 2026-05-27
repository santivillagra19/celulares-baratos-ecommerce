import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../actions/product";
import { toast } from "sonner";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Producto eliminado correctamente");
        },
        onError: (error) => {
            toast.error(error.message || "No se pudo eliminar el producto");
        }
    });

    return { deleteProduct: mutate, isDeleting: isPending };
};