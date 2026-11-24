import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue } from '../../../services/issue'

export const useDeleteIssues = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        }
    })
}