import { useQuery } from '@tanstack/react-query'
import { getRoles } from '../../../services/role'

export const useGetRoles = ({ orgSlug }) => {
    return useQuery({
        queryKey: ['roles', orgSlug],
        queryFn: () => getRoles({ orgSlug }),
        enabled: !!orgSlug
    })
}