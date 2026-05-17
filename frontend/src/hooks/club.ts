import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClubInfo, updateClubInfo } from '../services/club'

export const useClubInfo = () => {
  return useQuery({
    queryKey: ['clubInfo'],
    queryFn: getClubInfo,
  })
}

export const useUpdateClubInfo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateClubInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubInfo'] })
    },
  })
}
