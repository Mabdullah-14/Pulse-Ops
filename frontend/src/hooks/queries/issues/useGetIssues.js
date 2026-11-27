import { useInfiniteQuery } from '@tanstack/react-query'
import { getIssues } from '../../../services/issue'

export const useGetIssues = ({ orgSlug, projectId, filters = {}, limit = 10, enabled = true, }) => {
    return useInfiniteQuery({
        queryKey: ['issues', orgSlug, projectId, limit, filters],
        queryFn: ({ pageParam = null }) =>
            getIssues({ orgSlug, projectId, cursor: pageParam, limit, filters }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
        enabled: !!orgSlug
    })
}