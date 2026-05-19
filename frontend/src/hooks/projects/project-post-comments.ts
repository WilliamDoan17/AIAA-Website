import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCommentsByPostId, getProjectPostCommentById, createProjectPostComment, updateProjectPostComment, deleteProjectPostComment } from '../../services/projects/project-post-comments'
import type { ProjectPostCommentInsert, ProjectPostCommentUpdate } from '../../types/projects/project-post-comments'

export const useProjectPostComments = (postId: string) => {
  return useQuery({
    queryKey: ['projectPostComments', postId],
    queryFn: () => getCommentsByPostId(postId),
  })
}

export const useProjectPostComment = (commentId: string) => {
  return useQuery({
    queryKey: ['projectPostComments', commentId],
    queryFn: () => getProjectPostCommentById(commentId),
  })
}

export const useCreateProjectPostComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: ProjectPostCommentInsert) => createProjectPostComment(info),
    onSuccess: (_, { post_id }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPostComments', post_id] })
    },
  })
}

interface UpdateProjectPostCommentProps {
  commentId: string
  postId: string
  updates: ProjectPostCommentUpdate
}

export const useUpdateProjectPostComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ commentId, updates }: UpdateProjectPostCommentProps) =>
      updateProjectPostComment(commentId, updates),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPostComments', postId] })
    },
  })
}

interface DeleteProjectPostCommentProps {
  commentId: string
  postId: string
}

export const useDeleteProjectPostComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ commentId }: DeleteProjectPostCommentProps) =>
      deleteProjectPostComment(commentId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['projectPostComments', postId] })
    },
  })
}
