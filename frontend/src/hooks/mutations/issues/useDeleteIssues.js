import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue } from '../../../services/issue'
import { toast } from "sonner";
export const useDeleteIssues = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteIssue,
        onSuccess: () => {
            toast.success('Issue deleted successFully')
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
        onError: () => {
            toast.error("Something went wrong while deleting the issue.");
        },
    })
}