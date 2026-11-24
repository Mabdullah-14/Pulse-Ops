import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/auth";

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
        onError: (error) => {
            console.error(error)
        }
    })
}