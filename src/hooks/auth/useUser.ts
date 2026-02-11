import { useQuery } from "@tanstack/react-query"
import { getSesion } from "../../actions"

export const useUser = () => {
    const { data: session, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getSesion,
        retry: false,
        refetchOnWindowFocus: true,
    });

    return {
        session,
        isLoading,
    }
};