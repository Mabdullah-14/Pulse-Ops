import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../../../services/project';

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) =>
            updateProject({ orgSlug, projectId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};
