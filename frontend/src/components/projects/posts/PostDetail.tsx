import { useState } from 'react'
import type { ProjectPostDetail } from '../../../types/projects/project-posts'
import PostDetailView from './PostDetailView'
import PostDetailForm from './PostDetailForm'

interface PostDetailProps {
  post: ProjectPostDetail
  projectId: string
  canEdit: boolean
}

const PostDetail = ({ post, projectId, canEdit }: PostDetailProps) => {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <PostDetailForm
        post={post}
        projectId={projectId}
        onCancel={() => setEditing(false)}
        onSuccess={() => setEditing(false)}
      />
    )
  }

  return (
    <PostDetailView
      post={post}
      canEdit={canEdit}
      onEdit={() => setEditing(true)}
    />
  )
}

export default PostDetail
