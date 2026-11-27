import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../../../services/project';
import { toast } from 'sonner';
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) =>
            updateProject({ orgSlug, projectId }, data),
        onSuccess: () => {
            toast.success('Project updated successFully')
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: () => {
            toast.error('Something went wrong while updating a role')
        }
    });
};
