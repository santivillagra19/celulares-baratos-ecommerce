import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../actions";
import { useNavigate } from "react-router";

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
        onError: (error) => {
            console.error("Error completo:", error);
            alert(`Error al crear el producto: ${error.message}`);
        }
    });

    return {
        mutate,
        isPending,
    };
};
