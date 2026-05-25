import { useState } from 'react'
import { useUpdateProjectPost } from '../../../hooks/projects/project-posts'
import type { ProjectPostDetail, ProjectPostUpdate } from '../../../types/projects/project-posts'

interface PostDetailFormProps {
  post: ProjectPostDetail
  projectId: string
  onCancel: () => void
  onSuccess: () => void
}

type FieldErrors = Partial<Record<'title' | 'content', string>>

const validate = (title: string, content: string): FieldErrors => {
  const errors: FieldErrors = {}
  if (!title.trim()) errors.title = 'Title is required'
  else if (title.trim().length < 2 || title.trim().length > 128) errors.title = 'Title must be 2–128 characters'
  if (!content.trim()) errors.content = 'Content is required'
  else if (content.trim().length < 2 || content.trim().length > 4096) errors.content = 'Content must be 2–4096 characters'
  return errors
}

const PostDetailForm = ({ post, projectId, onCancel, onSuccess }: PostDetailFormProps) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const { mutate: update, isPending, error } = useUpdateProjectPost()

  const handleSave = () => {
    const errors = validate(title, content)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    update(
      { postId: post.id, projectId, updates: { title: title.trim(), content: content.trim() } as ProjectPostUpdate },
      { onSuccess }
    )
  }

  const handleCancel = () => {
    setTitle(post.title)
    setContent(post.content)
    setFieldErrors({})
    onCancel()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setFieldErrors(f => ({ ...f, title: undefined })) }}
          className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none transition-colors duration-200 ${fieldErrors.title ? 'border-red-400' : 'border-rim focus:border-accent'}`}
        />
        {fieldErrors.title && <p className="text-red-400 text-xs font-body">{fieldErrors.title}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Content</label>
        <textarea
          rows={10}
          value={content}
          onChange={e => { setContent(e.target.value); setFieldErrors(f => ({ ...f, content: undefined })) }}
          className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none transition-colors duration-200 resize-none ${fieldErrors.content ? 'border-red-400' : 'border-rim focus:border-accent'}`}
        />
        {fieldErrors.content && <p className="text-red-400 text-xs font-body">{fieldErrors.content}</p>}
      </div>

      {error && <p className="text-red-400 text-xs font-body">Failed to save changes</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-5 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleCancel}
          className="px-5 py-2.5 rounded border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PostDetailForm
