import { useDeleteProjectPostComment } from '../../../hooks/projects/project-post-comments'
import type { ProjectPostCommentDetail } from '../../../types/projects/project-post-comments'

interface DeleteCommentModalProps {
  comment: ProjectPostCommentDetail
  onClose: () => void
}

const DeleteCommentModal = ({ comment, onClose }: DeleteCommentModalProps) => {
  const { mutate: remove, isPending, error } = useDeleteProjectPostComment()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Delete Comment</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>
        <p className="font-body text-sm text-muted">Delete this comment? This cannot be undone.</p>
        {error && <p className="text-red-400 text-xs font-body">Failed to delete comment</p>}
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => remove({ commentId: comment.id, postId: comment.post_id }, { onSuccess: onClose })}
            disabled={isPending}
            className="flex-1 py-2.5 rounded border border-red-400 text-red-400 text-sm font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-400/10 transition-colors duration-200"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCommentModal
