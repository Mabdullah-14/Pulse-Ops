import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserRole } from '../../../services/orgMember';
import { toast } from 'sonner';
export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgSlug, userId, roleId }) =>
      changeUserRole({ orgSlug, userId, roleId }),
    onSuccess: (_, variables) => {
      toast.success('Role changes succesFully')
      queryClient.invalidateQueries({
        queryKey: ['org-members', variables.orgSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['member-details', variables.orgSlug, variables.userId],
      });
    },
    onError:()=>{
      toast.error('Something went wrong while changing role')
    }
  });
};
