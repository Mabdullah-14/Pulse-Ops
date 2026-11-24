import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIssue } from '../../../services/issue';

export const useCreateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) => createIssue({ orgSlug, projectId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['issues', orgSlug, projectId],
            });
        },
    });
};
