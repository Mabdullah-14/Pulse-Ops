import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRole } from '../../../services/role'
import { toast } from 'sonner'
export const useCreateRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data }) => createRole({ orgSlug, data }),
        onSuccess: () => {
            toast.success('Role created successFully')
            queryClient.invalidateQueries({
                queryKey: ['roles', orgSlug]
            })
        },
        onError:()=>{
            toast.error('Something went wrong while creating a role')
        }
    })
}