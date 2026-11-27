import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrganization } from "../../../services/organization"
import { toast } from "sonner";

export const useCreateOrganization = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOrganization,
        onSuccess: () => {
            toast.success('Organization created successFully')
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
        onError:()=>{
            toast.error('Something went wrong while creating an organization')
        }
    })
}