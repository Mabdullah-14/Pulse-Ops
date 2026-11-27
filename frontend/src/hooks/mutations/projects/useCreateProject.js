import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../../../services/project';
import { toast } from 'sonner';
export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, data }) => createProject({ orgSlug }, data),
        onSuccess: () => {
            toast.success('Project created successFully')
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError:()=>{
            toast.error('Something went wrong while creating a project')
        }
    });
};
