import { getAllMembers, getMemberInfo, inviteMember } from "../services/members"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { MemberInput } from "../types/member"

export const useMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers,
  })
}

export const useMember = (id: string) => {
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => getMemberInfo(id),
  })
}

export const useInviteMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: MemberInput) => inviteMember(info),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members'],
        exact: true,
      })
    }
  })
}






