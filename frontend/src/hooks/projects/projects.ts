import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProjects, getProjectById, getProjectsByMemberId, createProject, updateProject, deleteProject } from '../../services/projects/projects'
import type { ProjectInsert, ProjectUpdate } from '../../types/projects/projects'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  })
}

export const useMemberProjects = (memberId: string) => {
  return useQuery({
    queryKey: ['projects', 'member', memberId],
    queryFn: () => getProjectsByMemberId(memberId),
  })
}

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectById(id),
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: ProjectInsert) => createProject(info),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
        exact: true,
      })
    },
  })
}

interface UpdateProjectProps {
  id: string
  updates: ProjectUpdate
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: UpdateProjectProps) => updateProject(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      })
    },
  })
}
