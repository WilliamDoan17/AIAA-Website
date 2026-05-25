import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUpdateProjectPostComment, useDeleteProjectPostComment } from '../../../hooks/projects/project-post-comments'
import useAuth from '../../../hooks/useAuth'
import type { ProjectPostCommentDetail } from '../../../types/projects/project-post-comments'

interface CommentCardProps {
  comment: ProjectPostCommentDetail
  canAct: boolean
  onReply: () => void
  isIndented?: boolean
}

// ── Delete Modal ──────────────────────────────────────────────────────────────

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

// ── Comment Card ──────────────────────────────────────────────────────────────

const CommentCard = ({ comment, canAct, onReply, isIndented = false }: CommentCardProps) => {
  const { member } = useAuth()
  const memberBase = member?.role === 'admin' ? '/u/admin/member' : '/u/officer/member'
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(comment.content)
  const [contentError, setContentError] = useState<string>()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { mutate: update, isPending } = useUpdateProjectPostComment()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSave = () => {
    if (!content.trim()) { setContentError('Content is required'); return }
    if (content.trim().length < 2 || content.trim().length > 2048) { setContentError('Content must be 2–2048 characters'); return }
    update(
      { commentId: comment.id, postId: comment.post_id, updates: { content: content.trim() } },
      { onSuccess: () => { setEditing(false); setContentError(undefined) } }
    )
  }

  const handleCancel = () => {
    setContent(comment.content)
    setContentError(undefined)
    setEditing(false)
  }

  return (
    <>
      {deleting && <DeleteCommentModal comment={comment} onClose={() => setDeleting(false)} />}

      <div className={isIndented ? 'ml-10' : ''}>
        <div className="flex items-start gap-3">
          <Link to={`${memberBase}/${comment.author.id}`} className="w-7 h-7 flex-shrink-0 rounded-full overflow-hidden bg-rim mt-0.5 hover:opacity-80 transition-opacity duration-200">
            {comment.author.photo
              ? <img src={comment.author.photo} alt={comment.author.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-rim" />
            }
          </Link>

          <div className="flex-1 min-w-0">
            <div className="bg-surface border border-rim rounded px-4 py-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Link to={`${memberBase}/${comment.author.id}`} className="font-body text-xs font-medium text-copy hover:text-accent transition-colors duration-200">{comment.author.name}</Link>
                <span className="text-muted font-body text-xs">·</span>
                <p className="font-body text-[0.65rem] text-muted">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>

              {editing ? (
                <div className="flex flex-col gap-2 mt-1">
                  <textarea
                    rows={3}
                    value={content}
                    onChange={e => { setContent(e.target.value); setContentError(undefined) }}
                    className={`bg-void border rounded px-3 py-2 text-sm font-body text-copy focus:outline-none transition-colors duration-200 resize-none ${contentError ? 'border-red-400' : 'border-rim focus:border-accent'}`}
                  />
                  {contentError && <p className="text-red-400 text-xs font-body">{contentError}</p>}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isPending}
                      className="px-3 py-1.5 rounded border border-accent text-accent text-xs font-body font-medium cta-btn disabled:opacity-50 transition-colors duration-200"
                    >
                      {isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1.5 rounded border border-rim text-muted text-xs font-body hover:text-copy transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-body text-sm text-copy leading-relaxed">{comment.content}</p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-1.5 px-1">
              <button
                onClick={onReply}
                className="font-body text-xs text-muted hover:text-copy transition-colors duration-200"
              >
                Reply
              </button>
            </div>
          </div>

          {canAct && !editing && (
            <div className="relative flex-shrink-0" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-1.5 py-1 mt-0.5"
              >
                ···
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 z-10 bg-panel border border-rim rounded shadow-lg overflow-hidden min-w-[96px]">
                  <button
                    onClick={() => { setEditing(true); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 font-body text-xs text-copy hover:bg-surface transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setDeleting(true); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 font-body text-xs text-red-400 hover:bg-surface transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CommentCard
