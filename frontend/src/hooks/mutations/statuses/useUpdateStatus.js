import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from '../../../services/statuses';

export const useUpdateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, statusId, data }) =>
            updateStatus({ orgSlug, projectId, statusId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['status'] });
        },
    });
};
