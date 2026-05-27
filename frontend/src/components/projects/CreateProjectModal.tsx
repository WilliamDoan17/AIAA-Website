import { useState } from 'react'
import { useCreateProject } from '../../hooks/projects/projects'
import type { ProjectInsert, ProjectStatus, ProjectCategory } from '../../types/projects/projects'

const statusLabel: Record<ProjectStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  paused: 'Paused',
  completed: 'Completed',
}

const categoryLabel: Record<ProjectCategory, string> = {
  competition: 'Competition',
  research: 'Research',
}

type FieldErrors = Partial<Record<'name' | 'summary' | 'description' | 'cover_image', string>>

const validate = (form: ProjectInsert): FieldErrors => {
  const errors: FieldErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters'
  else if (form.name.trim().length > 80) errors.name = 'Name must be 80 characters or fewer'
  if (!form.summary.trim()) errors.summary = 'Summary is required'
  else if (form.summary.trim().length > 256) errors.summary = 'Summary must be 256 characters or fewer'
  if (!form.description.trim()) errors.description = 'Description is required'
  else if (form.description.trim().length > 4096) errors.description = 'Description must be 4096 characters or fewer'
  if (form.cover_image.trim()) {
    try { new URL(form.cover_image.trim()) } catch { errors.cover_image = 'Enter a valid URL' }
  }
  return errors
}

interface CreateProjectModalProps {
  onClose: () => void
}

const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const [form, setForm] = useState<ProjectInsert>({
    name: '', summary: '', description: '', cover_image: '',
    status: 'not_started', category: 'competition',
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const { mutate: create, isPending, error: createError } = useCreateProject()

  const setField = (key: keyof ProjectInsert, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof FieldErrors]) setFieldErrors(e => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = () => {
    const errors = validate(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    create({ ...form, name: form.name.trim(), cover_image: form.cover_image.trim() }, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-2xl w-full max-w-lg mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">New Project</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        {(['name', 'cover_image'] as const).map(key => {
          const err = fieldErrors[key]
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
                {key === 'cover_image' ? 'Cover Image URL' : 'Name'}
              </label>
              <input
                type="text"
                value={form[key]}
                onChange={e => setField(key, e.target.value)}
                className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {err && <p className="text-red-400 text-xs font-body">{err}</p>}
            </div>
          )
        })}

        {(['summary', 'description'] as const).map(key => {
          const err = fieldErrors[key]
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <textarea
                rows={key === 'description' ? 5 : 2}
                value={form[key]}
                onChange={e => setField(key, e.target.value)}
                className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {err && <p className="text-red-400 text-xs font-body">{err}</p>}
            </div>
          )
        })}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Category</label>
            <select
              value={form.category}
              onChange={e => setField('category', e.target.value)}
              className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
            >
              {(Object.keys(categoryLabel) as ProjectCategory[]).map(c => (
                <option key={c} value={c}>{categoryLabel[c]}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Status</label>
            <select
              value={form.status}
              onChange={e => setField('status', e.target.value)}
              className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
            >
              {(Object.keys(statusLabel) as ProjectStatus[]).map(s => (
                <option key={s} value={s}>{statusLabel[s]}</option>
              ))}
            </select>
          </div>
        </div>

        {createError && <p className="text-red-400 text-xs font-body">Failed to create project</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="relative overflow-hidden flex-1 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Creating...' : 'Create Project'}
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

export default CreateProjectModal
