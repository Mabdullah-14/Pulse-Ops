import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../../../services/project';

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, data }) => createProject({ orgSlug }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};
