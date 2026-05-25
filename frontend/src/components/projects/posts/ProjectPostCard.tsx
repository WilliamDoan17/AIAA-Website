import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import type { ProjectPostDetail } from '../../../types/projects/project-posts'

interface ProjectPostCardProps {
  post: ProjectPostDetail
  to: string
  onDelete?: () => void
}

const ProjectPostCard = ({ post, to, onDelete }: ProjectPostCardProps) => {
  const { member } = useAuth()
  const memberBase = member?.role === 'admin' ? '/u/admin/member' : '/u/officer/member'
  return (
    <div className="flex items-start gap-4 bg-surface border border-rim rounded px-5 py-4">
      <Link to={`${memberBase}/${post.author.id}`} className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-rim hover:opacity-80 transition-opacity duration-200">
        {post.author.photo
          ? <img src={post.author.photo} alt={post.author.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-rim" />
        }
      </Link>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link to={`${memberBase}/${post.author.id}`} className="font-body text-xs font-medium text-copy hover:text-accent transition-colors duration-200">{post.author.name}</Link>
          <span className="text-muted font-body text-xs">·</span>
          <p className="font-body text-[0.65rem] text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
        <Link to={to} className="group">
          <p className="font-body text-sm font-medium text-copy group-hover:text-accent transition-colors duration-200">{post.title}</p>
          <p className="font-body text-xs text-muted line-clamp-2 leading-relaxed">{post.content}</p>
        </Link>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1 flex-shrink-0"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default ProjectPostCard
