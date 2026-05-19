import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProjectPost } from '../hooks/projects/project-posts'
import { useProjectMembers } from '../hooks/projects/project-members'
import useAuth from '../hooks/useAuth'
import PostDetailView from '../components/projects/PostDetailView'
import CommentSection from '../components/projects/CommentSection'

const ProjectPostDetail = () => {
  const { id, postId } = useParams<{ id: string; postId: string }>()
  const { member } = useAuth()
  const { data: post, isLoading, isError } = useProjectPost(postId!)
  const { data: projectMembers = [] } = useProjectMembers(id!)

  const isProjectAdmin = useMemo(
    () => projectMembers.some(m => m.member_id === member?.id && m.role === 'admin'),
    [projectMembers, member]
  )
  const isClubAdmin = member?.role === 'admin'
  const canManage = isProjectAdmin || isClubAdmin
  const canEdit = canManage || post?.author_id === member?.id

  const backPath = isClubAdmin
    ? `/u/admin/projects/${id}`
    : `/u/officer/projects/${id}`

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  if (isError || !post) return (
    <div className="flex flex-col gap-4">
      <p className="text-muted font-body text-sm">Post not found.</p>
      <Link to={backPath} className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
        ← Back to Project
      </Link>
    </div>
  )

  return (
    <div className="max-w-3xl flex flex-col gap-10">
      <Link
        to={backPath}
        className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200"
      >
        ← Back to Project
      </Link>

      <PostDetailView post={post} projectId={id!} canEdit={canEdit} />

      <div className="border-t border-rim pt-8">
        <CommentSection postId={postId!} projectId={id!} memberId={member!.id} />
      </div>
    </div>
  )
}

export default ProjectPostDetail
