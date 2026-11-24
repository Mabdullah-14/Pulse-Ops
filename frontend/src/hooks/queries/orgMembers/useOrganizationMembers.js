import { useQuery } from '@tanstack/react-query';
import { getOrganizationMembers } from '../../../services/orgMember';

export const useOrganizationMembers = (orgSlug) => {
  return useQuery({
    queryKey: ['org-members', orgSlug],
    queryFn: () => getOrganizationMembers(orgSlug),
    enabled: !!orgSlug,
 
  });
};
