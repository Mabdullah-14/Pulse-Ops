import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrganization } from "../../../services/organization"


export const useCreateOrganization = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        }
    })
}