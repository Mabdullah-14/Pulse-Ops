import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserRole } from '../../../services/orgMember';

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgSlug, userId, roleId }) =>
      changeUserRole({ orgSlug, userId, roleId }),
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
