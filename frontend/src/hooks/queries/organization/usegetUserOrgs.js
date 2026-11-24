import { useQuery } from '@tanstack/react-query';
import { getUserOrganizations } from '../../../services/organization';

export const useGetUserOrgs = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getUserOrganizations,
    
  });
};
