import { useState } from 'react'
import { useProjectPosts, useCreateProjectPost, useUpdateProjectPost, useDeleteProjectPost } from '../../hooks/projects/project-posts'
import type { ProjectPostDetail, ProjectPostInsert, ProjectPostUpdate } from '../../types/projects/project-posts'
import ProjectPostCard from './ProjectPostCard'

interface ProjectPostsTabProps {
  projectId: string
  memberId: string
  canManage: boolean
}

// ── Create / Edit Modal ───────────────────────────────────────────────────────

type PostForm = { title: string; content: string }
type PostFieldErrors = Partial<Record<'title' | 'content', string>>

const validatePostForm = (form: PostForm): PostFieldErrors => {
  const errors: PostFieldErrors = {}
  if (!form.title.trim()) errors.title = 'Title is required'
  else if (form.title.trim().length < 2 || form.title.trim().length > 128) errors.title = 'Title must be 2–128 characters'
  if (!form.content.trim()) errors.content = 'Content is required'
  else if (form.content.trim().length < 2 || form.content.trim().length > 4096) errors.content = 'Content must be 2–4096 characters'
  return errors
}

interface PostModalProps {
  projectId: string
  memberId: string
  post?: ProjectPostDetail
  onClose: () => void
}

const PostModal = ({ projectId, memberId, post, onClose }: PostModalProps) => {
  const isEdit = !!post
  const [form, setForm] = useState<PostForm>({
    title: post?.title ?? '',
    content: post?.content ?? '',
  })
  const [fieldErrors, setFieldErrors] = useState<PostFieldErrors>({})
  const { mutate: create, isPending: isCreating, error: createError } = useCreateProjectPost()
  const { mutate: update, isPending: isUpdating, error: updateError } = useUpdateProjectPost()
  const isPending = isCreating || isUpdating

  const setField = (key: keyof PostForm, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key]) setFieldErrors(e => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = () => {
    const errors = validatePostForm(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }

    const payload = { title: form.title.trim(), content: form.content.trim() }

    if (isEdit) {
      update(
        { postId: post.id, projectId, updates: payload as ProjectPostUpdate },
        { onSuccess: onClose }
      )
    } else {
      create(
        { ...payload, project_id: projectId, author_id: memberId } as ProjectPostInsert,
        { onSuccess: onClose }
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-lg mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
            {isEdit ? 'Edit Post' : 'New Post'}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.title ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.title && <p className="text-red-400 text-xs font-body">{fieldErrors.title}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Content</label>
          <textarea
            rows={6}
            value={form.content}
            onChange={e => setField('content', e.target.value)}
            className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${fieldErrors.content ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.content && <p className="text-red-400 text-xs font-body">{fieldErrors.content}</p>}
        </div>

        {(createError || updateError) && (
          <p className="text-red-400 text-xs font-body">Failed to {isEdit ? 'update' : 'create'} post</p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Post'}
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

// ── Delete Confirm Modal ──────────────────────────────────────────────────────

interface DeletePostModalProps {
  post: ProjectPostDetail
  projectId: string
  onClose: () => void
}

const DeletePostModal = ({ post, projectId, onClose }: DeletePostModalProps) => {
  const { mutate: remove, isPending, error } = useDeleteProjectPost()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Delete Post</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted">
          Delete <span className="text-copy font-medium">{post.title}</span>? This cannot be undone.
        </p>

        {error && <p className="text-red-400 text-xs font-body">Failed to delete post</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => remove({ postId: post.id, projectId }, { onSuccess: onClose })}
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

// ── Main Tab ──────────────────────────────────────────────────────────────────

const ProjectPostsTab = ({ projectId, memberId, canManage }: ProjectPostsTabProps) => {
  const { data: posts = [], isLoading } = useProjectPosts(projectId)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<ProjectPostDetail | null>(null)
  const [deleting, setDeleting] = useState<ProjectPostDetail | null>(null)

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  return (
    <>
      {creating && (
        <PostModal projectId={projectId} memberId={memberId} onClose={() => setCreating(false)} />
      )}
      {editing && (
        <PostModal projectId={projectId} memberId={memberId} post={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <DeletePostModal post={deleting} projectId={projectId} onClose={() => setDeleting(null)} />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted font-body text-sm">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {posts.map(post => (
              <div key={post.id} className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <ProjectPostCard post={post} />
                </div>
                {(canManage || post.author_id === memberId) && (
                  <div className="flex flex-col gap-1 flex-shrink-0 pt-3">
                    <button
                      onClick={() => setEditing(post)}
                      className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(post)}
                      className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectPostsTab
