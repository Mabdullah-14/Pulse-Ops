import { useQuery } from '@tanstack/react-query';
import { getMemberdetails } from '../../../services/orgMember';

export const useMemberDetails = ({ orgSlug, userId }) => {
  return useQuery({
    queryKey: ['member-details', orgSlug, userId],
    queryFn: () => getMemberdetails({ orgSlug, userId }),
    enabled: !!orgSlug && !!userId,
    
  });
};
