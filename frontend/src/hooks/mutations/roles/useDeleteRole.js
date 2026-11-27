import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRole } from '../../../services/role'
import { toast } from 'sonner'
export const useDeleteRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ roleId }) => deleteRole({ orgSlug, roleId }),
        onSuccess: () => {
            toast.success('Role deleted successFully')
            queryClient.invalidateQueries({ queryKey: ['roles', orgSlug] })
        },
        onError:()=>{
            toast.error('Something went wrong while deleting a role')
        }
    })
}