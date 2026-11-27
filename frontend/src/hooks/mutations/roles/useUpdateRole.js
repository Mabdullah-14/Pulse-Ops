import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRole } from '../../../services/role'
import { toast } from 'sonner'
export const useUpdateRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({  roleId }, data) => updateRole({ orgSlug, roleId }, data),
        onSuccess: () => {
            toast.success('Role updated successFully')
            queryClient.invalidateQueries({ queryKey: ['roles', orgSlug] })
        },
        onError:()=>{
            toast.error('Something went wron while updating a role')
        }
    })

}