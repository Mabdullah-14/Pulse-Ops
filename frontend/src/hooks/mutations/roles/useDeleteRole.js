import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRole } from '../../../services/role'

export const useDeleteRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ roleId }) => deleteRole({ orgSlug, roleId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles', orgSlug] })
        }
    })
}