import { useQuery } from "@tanstack/react-query";
import { getEntityAuditLogs } from '../../../services/auditlogs'

export const useGetEntityAuditLogs = ({ orgSlug, entityType, entityId }) => {
    return useQuery({
        queryKey: ['auditlogs', orgSlug, entityType, entityId],
        queryFn: ({ orgSlug, entityType, entityId }) => getEntityAuditLogs({ orgSlug, entityType, entityId }),
        enabled: !!orgSlug || !!entityId || !!entityId
    })
}