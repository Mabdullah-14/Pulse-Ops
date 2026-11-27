import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIssue } from '../../../services/issue';
import { toast } from 'sonner'
export const useCreateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) => createIssue({ orgSlug, projectId }, data),
        onSuccess: (_data, { orgSlug, projectId }) => {
            toast.success('Issue created successFully')
            queryClient.invalidateQueries({
                queryKey: ['issues', orgSlug, projectId],
            });
        },
        onError: () => {
            toast.error('Something went wrong while creating a issue')
        }
    });
};
