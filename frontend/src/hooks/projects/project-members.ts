import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMembersByProjectId, addProjectMember, updateProjectMember, removeProjectMember } from '../../services/projects/project-members'
import type { ProjectMemberInsert, ProjectMemberUpdate } from '../../types/projects/project-members'

export const useProjectMembers = (projectId: string) => {
  return useQuery({
    queryKey: ['projectMembers', projectId],
    queryFn: () => getMembersByProjectId(projectId),
  })
}

export const useAddProjectMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: ProjectMemberInsert) => addProjectMember(info),
    onSuccess: (_, { project_id }) => {
      queryClient.invalidateQueries({
        queryKey: ['projectMembers', project_id],
      })
    },
  })
}

interface UpdateProjectMemberProps {
  projectId: string
  memberId: string
  updates: ProjectMemberUpdate
}

export const useUpdateProjectMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ projectId, memberId, updates }: UpdateProjectMemberProps) =>
      updateProjectMember(projectId, memberId, updates),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ['projectMembers', projectId],
      })
    },
  })
}

interface RemoveProjectMemberProps {
  projectId: string
  memberId: string
}

export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ projectId, memberId }: RemoveProjectMemberProps) =>
      removeProjectMember(projectId, memberId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ['projectMembers', projectId],
      })
    },
  })
}
