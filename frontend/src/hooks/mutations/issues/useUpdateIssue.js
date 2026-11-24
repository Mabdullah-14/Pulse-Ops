import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from '../../../services/issue';

export const useUpdateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, issueId, data }) =>
            updateIssue({ orgSlug, projectId, issueId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
        },
    });
};
