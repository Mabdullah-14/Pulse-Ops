import { useMutation,useQueryClient } from "@tanstack/react-query";
import { addMemberToOrg } from "../../../services/orgMember";
import { toast } from "sonner";
export const useAddMemberToOrg=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:addMemberToOrg,
        onSuccess:()=>{
            toast.success('Member successFully added to organization.')
            queryClient.invalidateQueries({queryKey:['org_Members']})
        },
        onError:()=>{
            toast.error('Something went wrong  while adding a member to organization')
        }
    })
}