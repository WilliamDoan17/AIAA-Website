import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import type { ProjectPostDetail } from '../../../types/projects/project-posts'

interface PostDetailViewProps {
  post: ProjectPostDetail
  canEdit: boolean
  onEdit: () => void
}

const PostDetailView = ({ post, canEdit, onEdit }: PostDetailViewProps) => {
  const { member } = useAuth()
  const memberBase = member?.role === 'admin' ? '/u/admin/member' : '/u/officer/member'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link to={`${memberBase}/${post.author.id}`} className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-rim group-hover:opacity-80 transition-opacity duration-200">
            {post.author.photo
              ? <img src={post.author.photo} alt={post.author.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-rim" />
            }
          </div>
          <div className="flex items-center gap-2">
            <p className="font-body text-xs font-medium text-copy group-hover:text-accent transition-colors duration-200">{post.author.name}</p>
            <span className="text-muted font-body text-xs">·</span>
            <p className="font-body text-[0.65rem] text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </Link>
        {canEdit && (
          <button
            onClick={onEdit}
            className="ml-auto font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
          >
            Edit
          </button>
        )}
      </div>

      <h1 className="font-display text-xl font-bold uppercase tracking-wide text-copy">{post.title}</h1>

      <p className="font-body text-sm text-muted leading-relaxed whitespace-pre-wrap">{post.content}</p>
    </div>
  )
}

export default PostDetailView
