import { useQuery } from '@tanstack/react-query'
import { getAuditLogs } from '../../../services/auditlogs'

export const useGetAuditLogs = (orgSlug) => {
    return useQuery({
        queryKey: ['auditlogs', orgSlug],
        queryFn: ({ orgSlug }) => getAuditLogs({ orgSlug }),
        enabled: !!orgSlug
    })
}