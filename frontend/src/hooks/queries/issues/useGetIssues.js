import { useQuery } from "@tanstack/react-query";
import { getIssues } from '../../../services/issue';

export const useGetIssues = ({ orgSlug, projectId }) => {
    return useQuery({
        queryKey: ['issues', orgSlug, projectId],
        queryFn: () => getIssues({ orgSlug, projectId }),
        enabled: !!orgSlug && !!projectId,
        
    });
};
