import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRole } from '../../../services/role'

export const useCreateRole = (orgSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data }) => createRole({ orgSlug, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles', orgSlug]
            })
        }
    })
}