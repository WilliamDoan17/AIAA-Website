import { useState } from "react"
import { useCreateProjectPostComment } from "../../../hooks/projects/project-post-comments"

interface ReplyFormProps {
  postId: string
  memberId: string
  replyToId: string
  onClose: () => void
}

const ReplyForm = ({ postId, memberId, replyToId, onClose }: ReplyFormProps) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState<string>()
  const { mutate: create, isPending } = useCreateProjectPostComment()

  const handleSubmit = () => {
    if (!content.trim()) { setError('Reply cannot be empty'); return }
    if (content.trim().length < 2 || content.trim().length > 2048) { setError('Reply must be 2–2048 characters'); return }
    create(
      { post_id: postId, author_id: memberId, content: content.trim(), reply_to_id: replyToId },
      { onSuccess: () => { setContent(''); onClose() } }
    )
  }

  return (
    <div className="ml-10 mt-2 flex flex-col gap-2">
      <textarea
        rows={2}
        placeholder="Write a reply…"
        value={content}
        onChange={e => { setContent(e.target.value); setError(undefined) }}
        className={`w-full bg-surface border rounded px-3 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${error ? 'border-red-400' : 'border-rim focus:border-accent'}`}
        autoFocus
      />
      {error && <p className="text-red-400 text-xs font-body">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-3 py-1.5 rounded border border-accent text-accent text-xs font-body font-medium cta-btn disabled:opacity-50 transition-colors duration-200"
        >
          {isPending ? 'Posting...' : 'Reply'}
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded border border-rim text-muted text-xs font-body hover:text-copy transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ReplyForm
