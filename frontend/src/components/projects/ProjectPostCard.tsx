import type { ProjectPostDetail } from '../../types/projects/project-posts'

interface ProjectPostCardProps {
  post: ProjectPostDetail
  onDelete?: () => void
}

const ProjectPostCard = ({ post, onDelete }: ProjectPostCardProps) => {
  return (
    <div className="flex items-start gap-4 bg-surface border border-rim rounded px-5 py-4">
      <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-rim">
        {post.author.photo
          ? <img src={post.author.photo} alt={post.author.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-body text-xs font-medium text-copy">{post.author.name}</p>
          <span className="text-muted font-body text-xs">·</span>
          <p className="font-body text-[0.65rem] text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
        <p className="font-body text-sm font-medium text-copy">{post.title}</p>
        <p className="font-body text-xs text-muted line-clamp-2 leading-relaxed">{post.content}</p>
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
