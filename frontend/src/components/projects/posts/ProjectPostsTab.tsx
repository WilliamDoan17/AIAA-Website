import { useState } from 'react'
import { useProjectPosts } from '../../../hooks/projects/project-posts'
import type { ProjectPostDetail } from '../../../types/projects/project-posts'
import ProjectPostCard from './ProjectPostCard'
import CreatePostModal from './CreatePostModal'
import DeletePostModal from './DeletePostModal'

interface ProjectPostsTabProps {
  projectId: string
  memberId: string
  canManage: boolean
  basePath: string
}

type ModalState =
  | { type: 'create' }
  | { type: 'delete'; post: ProjectPostDetail }
  | null

const ProjectPostsTab = ({ projectId, memberId, canManage, basePath }: ProjectPostsTabProps) => {
  const { data: posts = [], isLoading } = useProjectPosts(projectId)
  const [modal, setModal] = useState<ModalState>(null)

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  return (
    <>
      {modal?.type === 'create' && (
        <CreatePostModal projectId={projectId} memberId={memberId} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'delete' && (
        <DeletePostModal post={modal.post} projectId={projectId} onClose={() => setModal(null)} />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => setModal({ type: 'create' })}
            className="px-4 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted font-body text-sm">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {posts.map(post => {
              const canAct = canManage || post.author_id === memberId
              return (
                <ProjectPostCard
                  key={post.id}
                  post={post}
                  to={`${basePath}/posts/${post.id}`}
                  onDelete={canAct ? () => setModal({ type: 'delete', post }) : undefined}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectPostsTab
