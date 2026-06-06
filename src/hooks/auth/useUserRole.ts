import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../../actions/auth";

export const useUserRole = (userId: string | undefined) => {
    const { data: role, isLoading } = useQuery({
        queryKey: ['userRole', userId],
        queryFn: () => getUserRole(userId as string),
        enabled: !!userId,
        staleTime: 1000 * 60 * 60, // 1 hora
    });

    return { role, isLoading };
};
