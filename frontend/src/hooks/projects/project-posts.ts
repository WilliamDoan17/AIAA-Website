import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectPostsByProjectId, getProjectPostById, createProjectPost, updateProjectPost, deleteProjectPost } from '../../services/projects/project-posts'
import type { ProjectPostInsert, ProjectPostUpdate } from '../../types/projects/project-posts'

export const useProjectPosts = (projectId: string) => {
  return useQuery({
    queryKey: ['projectPosts', projectId],
    queryFn: () => getProjectPostsByProjectId(projectId),
  })
}

export const useProjectPost = (postId: string) => {
  return useQuery({
    queryKey: ['projectPosts', postId],
    queryFn: () => getProjectPostById(postId),
  })
}

export const useCreateProjectPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: ProjectPostInsert) => createProjectPost(info),
    onSuccess: (_, { project_id }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPosts', project_id] })
    },
  })
}

interface UpdateProjectPostProps {
  postId: string
  projectId: string
  updates: ProjectPostUpdate
}

export const useUpdateProjectPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, updates }: UpdateProjectPostProps) =>
      updateProjectPost(postId, updates),
    onSuccess: (_, { postId, projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPosts', postId] })
      queryClient.invalidateQueries({ queryKey: ['projectPosts', projectId] })
    },
  })
}

interface DeleteProjectPostProps {
  postId: string
  projectId: string
}

export const useDeleteProjectPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId }: DeleteProjectPostProps) => deleteProjectPost(postId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPosts', projectId] })
    },
  })
}
