import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStatus } from '../../../services/statuses';
import { toast } from "sonner";
export const useCreateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, data }) =>
            createStatus({ orgSlug, projectId }, data),
        onSuccess: async (_data, variables) => {
            toast.success('Column created successFully')
            await queryClient.invalidateQueries({
                queryKey: ['status', variables.orgSlug, variables.projectId],
            });
        },
        onError:()=>{
            toast.error('Something went wrong while creating a column')
        }
    });
};
