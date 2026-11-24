import { useMutation, useQueryClient } from '@tanstack/react-query'
import { register } from '../../../services/auth'

export const useRegisterUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
        onError: (error) => {
            console.error(error)
        }

    })
}