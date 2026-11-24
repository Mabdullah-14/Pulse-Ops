import { useQuery } from "@tanstack/react-query";
import { getProjects } from '../../../services/project';

export const useGetProjects = ({ orgSlug }) => {
    return useQuery({
        queryKey: ['projects', orgSlug],
        queryFn: () => getProjects({ orgSlug }),
        enabled: !!orgSlug,
      
    });
};
