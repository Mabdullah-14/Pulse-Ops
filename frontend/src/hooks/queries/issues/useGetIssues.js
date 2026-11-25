import { useInfiniteQuery } from '@tanstack/react-query'
import { getIssues } from '../../../services/issue'

export const useGetIssues = ({ orgSlug, projectId, limit = 10, enabled = true }) => {
    return useInfiniteQuery({
        queryKey: ['issues', orgSlug, projectId, limit],
        queryFn: ({ pageParam = null }) =>
            getIssues({ orgSlug, projectId, cursor: pageParam, limit }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
        enabled: !!orgSlug
    })
}