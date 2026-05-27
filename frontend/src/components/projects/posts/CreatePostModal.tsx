import { useState } from 'react'
import { useCreateProjectPost } from '../../../hooks/projects/project-posts'
import type { ProjectPostInsert } from '../../../types/projects/project-posts'

interface CreatePostModalProps {
  projectId: string
  memberId: string
  onClose: () => void
}

type PostForm = { title: string; content: string }
type PostFieldErrors = Partial<Record<'title' | 'content', string>>

const validate = (form: PostForm): PostFieldErrors => {
  const errors: PostFieldErrors = {}
  if (!form.title.trim()) errors.title = 'Title is required'
  else if (form.title.trim().length < 2 || form.title.trim().length > 128) errors.title = 'Title must be 2–128 characters'
  if (!form.content.trim()) errors.content = 'Content is required'
  else if (form.content.trim().length < 2 || form.content.trim().length > 4096) errors.content = 'Content must be 2–4096 characters'
  return errors
}

const CreatePostModal = ({ projectId, memberId, onClose }: CreatePostModalProps) => {
  const [form, setForm] = useState<PostForm>({ title: '', content: '' })
  const [fieldErrors, setFieldErrors] = useState<PostFieldErrors>({})
  const { mutate: create, isPending, error } = useCreateProjectPost()

  const setField = (key: keyof PostForm, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key]) setFieldErrors(e => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = () => {
    const errors = validate(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    create(
      { title: form.title.trim(), content: form.content.trim(), project_id: projectId, author_id: memberId } as ProjectPostInsert,
      { onSuccess: onClose }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-2xl w-full max-w-lg mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">New Post</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.title ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.title && <p className="text-red-400 text-xs font-body">{fieldErrors.title}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Content</label>
          <textarea
            rows={6}
            value={form.content}
            onChange={e => setField('content', e.target.value)}
            className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${fieldErrors.content ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.content && <p className="text-red-400 text-xs font-body">{fieldErrors.content}</p>}
        </div>

        {error && <p className="text-red-400 text-xs font-body">Failed to create post</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Saving...' : 'Create Post'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
