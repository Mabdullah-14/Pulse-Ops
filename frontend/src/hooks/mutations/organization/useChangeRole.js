import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserRole } from '../../../services/orgMember';
export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgSlug, userId, role }) =>
      changeUserRole({ orgSlug, userId, role }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['org-members', variables.orgSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['member-details', variables.orgSlug, variables.userId],
      });
    },
  });
};
