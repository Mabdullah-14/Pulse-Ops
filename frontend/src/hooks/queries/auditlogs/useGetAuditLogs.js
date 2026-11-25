import { useInfiniteQuery } from '@tanstack/react-query';
import { getAuditLogs } from '../../../services/auditlogs';

export const useGetAuditLogs = ({ orgSlug, enabled = true, limit = 10 }) => {
    return useInfiniteQuery({
        queryKey: ['auditlogs', orgSlug, limit],
        queryFn: ({ pageParam = null }) =>
            getAuditLogs({ orgSlug, cursor: pageParam, limit }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
        enabled: !!orgSlug && enabled,
    });
};
