import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../actions/order";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ orderId, status }: { orderId: number; status: string }) => 
            updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-orders'] });
            toast.success("Estado de la orden actualizado", { position: 'bottom-right' });
        },
        onError: (error) => {
            toast.error(error.message || "Error al actualizar la orden", { position: 'bottom-right' });
        }
    });

    return { updateStatus: mutate, isUpdating: isPending };
};
