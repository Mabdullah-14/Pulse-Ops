import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from '../../../services/issue';
import { toast } from "sonner";
export const useUpdateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgSlug, projectId, issueId, data }) =>
            updateIssue({ orgSlug, projectId, issueId }, data),
        onSuccess: () => {
            toast.success('Issue updated successFully')
            queryClient.invalidateQueries({ queryKey: ['issues'] });
        },
        onError:(error)=>{
            if(error?.status===409){
                toast.warning('Someone else updated this issue. Refreshing board...')
                queryClient.invalidateQueries({queryKey:['issues']})
            } else {
                toast.error('Something went wron while updating an issue')
            }
        }
    });
};
