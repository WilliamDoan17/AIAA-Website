import { deleteMember, getAllMembers, getMemberInfo, inviteMember, updateMember } from "../services/members"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Member, MemberInput } from "../types/member"

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

interface UpdateMemberProps {
  id: string,
  updates: Partial<Member>
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: UpdateMemberProps) => updateMember(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members'],
      })
    }
  })
}

export const useDeleteMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members'],
      })
    }
  })
}






