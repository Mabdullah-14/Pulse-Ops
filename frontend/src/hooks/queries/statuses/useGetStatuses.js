import { useQuery } from "@tanstack/react-query";
import { getStatuses } from '../../../services/statuses';

export const useGetStatuses = ({ orgSlug, projectId }) => {
    return useQuery({
        queryKey: ['status', orgSlug, projectId],
        queryFn: () => getStatuses({ orgSlug, projectId }),
        enabled: !!orgSlug && !!projectId,
        refetchInterval:5000
    });
};
