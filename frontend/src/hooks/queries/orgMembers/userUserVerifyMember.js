import { useQuery } from '@tanstack/react-query';
import { verifyMemberBySlug } from '../../../services/orgMember';

export const useVerifyMembership = (slug) => {
  return useQuery({
    queryKey: ['verify-membership', slug],
    queryFn: () => verifyMemberBySlug(slug),
    enabled: !!slug,
  });
};
