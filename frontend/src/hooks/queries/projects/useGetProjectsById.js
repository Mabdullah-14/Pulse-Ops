import { useQuery } from "@tanstack/react-query";
import { getProjectById } from '../../../services/project';

export const useGetProjectById = ({ orgSlug, projectId }) => {
    return useQuery({
        queryKey: ['projects', orgSlug, projectId],
        queryFn: () => getProjectById({ orgSlug, projectId }),
        enabled: !!orgSlug && !!projectId,
       
    });
};
