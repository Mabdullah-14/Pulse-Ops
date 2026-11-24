import { useMutation,useQueryClient } from "@tanstack/react-query";
import { addMemberToOrg } from "../../../services/orgMember";

export const useAddMemberToOrg=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:addMemberToOrg,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['org_Members']})
        }
    })
}