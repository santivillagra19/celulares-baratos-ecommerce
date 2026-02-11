import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { signUp } from "../../actions";


export const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: error => {
            toast.error(error.message, {
                position: 'bottom-right',
            });
        },
    });


    return {
        mutate,
        isPending,
    }
};