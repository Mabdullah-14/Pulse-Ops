import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from '../../../services/statuses';
import { toast } from "sonner";
export const useUpdateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, statusId, data }) =>
            updateStatus({ orgSlug, projectId, statusId }, data),
        onSuccess: () => {
            toast.success('Status column updated successFully ')
            queryClient.invalidateQueries({ queryKey: ['status'] });
        },
        onError: () => {
            toast.error('Something went wrong while updating a role')
        }
    });
};
