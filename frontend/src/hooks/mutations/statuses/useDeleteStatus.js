import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStatus } from '../../../services/statuses'

export const useDeleteStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['status'] })
        }
    })
}