import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../actions/order";

export const useAllOrders = ({ page = 1 }: { page?: number }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['all-orders', page],
        queryFn: () => getAllOrders(page),
        staleTime: 1000 * 60 * 5,
    });

    return { 
        orders: data?.orders, 
        isLoading, 
        isError,
        totalOrders: data?.count ?? 0, 
    };
};
