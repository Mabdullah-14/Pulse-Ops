import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStatus } from '../../../services/statuses';

export const useCreateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) =>
            createStatus({ orgSlug, projectId }, data),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['status', variables.orgSlug, variables.projectId],
            });
        },
    });
};
