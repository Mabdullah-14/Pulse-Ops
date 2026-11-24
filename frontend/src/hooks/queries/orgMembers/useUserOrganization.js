import { useQuery } from '@tanstack/react-query';
import { getUserOrganizations } from '../../../services/orgMember';

export const useUserOrganizations = () => {
  return useQuery({
    queryKey: ['user-organizations'],
    queryFn: getUserOrganizations,
  });
};
