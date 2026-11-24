import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../../services/auth";

export const useLogoutUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.clear();
            queryClient.setQueryData(["profile"], null);
        },
        onError: (error) => {
            console.error(error);
        }
    });
};
