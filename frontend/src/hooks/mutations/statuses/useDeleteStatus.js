import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStatus } from '../../../services/statuses'
import { toast } from "sonner";
export const useDeleteStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteStatus,
        onSuccess: () => {
            toast.success("Status column deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['status'] })
        },
        onError:()=>{
            toast.error('Something went worng while deleting a status column.')
        }
    })
}