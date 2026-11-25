import { useQuery } from "@tanstack/react-query";
import { getIssueById } from '../../../services/issue';

export const useGetIssueById = ({ orgSlug, projectId, issueId }) => {
    return useQuery({
        queryKey: ['issues', orgSlug, projectId, issueId],
        queryFn: () => getIssueById({ orgSlug, projectId, issueId }),
        enabled: !!orgSlug && !!projectId && !!issueId,

    });
};
