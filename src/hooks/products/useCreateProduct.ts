import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../actions";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });

            navigate('/dashboard/productos');
        },
        onError: (error: any) => {
            console.error("Detalle del error:", error);
            toast.error(`Error: ${error.message}`, {position: 'bottom-right'});
        }
    });

    return {
        mutate,
        isPending,
    };
};
