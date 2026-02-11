import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { signIn } from "../../actions";


export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
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