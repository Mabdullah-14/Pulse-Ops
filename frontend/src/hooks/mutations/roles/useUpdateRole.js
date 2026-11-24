import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRole } from '../../../services/role'

export const useUpdateRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({  roleId }, data) => updateRole({ orgSlug, roleId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles', orgSlug] })
        }
    })

}