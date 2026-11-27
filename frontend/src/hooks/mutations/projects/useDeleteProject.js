import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from '../../../services/project'
import { toast } from "sonner";
export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            toast.success('Project deleted successFully')
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onError:()=>{
            toast.error('Something went wrong while deleting project')
        }
    })
}