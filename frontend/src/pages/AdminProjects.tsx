import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProjects, useCreateProject, useDeleteProject } from '../hooks/projects/projects'
import type { Project, ProjectInsert, ProjectStatus, ProjectCategory } from '../types/projects/projects'

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

const statusStyle: Record<ProjectStatus, string> = {
  not_started: 'text-muted border-rim',
  in_progress: 'text-accent border-accent/30',
  paused: 'text-gold border-gold/30',
  completed: 'text-green-400 border-green-400/30',
}

// ── Validation ────────────────────────────────────────────────────────────────

type ProjectFieldErrors = Partial<Record<
  'name' | 'summary' | 'description' | 'cover_image' | 'status' | 'category',
  string
>>

const validateProjectForm = (form: ProjectInsert): ProjectFieldErrors => {
  const errors: ProjectFieldErrors = {}
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

// ── Shared Form Modal ─────────────────────────────────────────────────────────

interface ProjectFormModalProps {
  title: string
  form: ProjectInsert
  fieldErrors: ProjectFieldErrors
  isPending: boolean
  submitLabel: string
  pendingLabel: string
  serverError: string | null
  onField: (key: keyof ProjectInsert, value: string) => void
  onSubmit: () => void
  onClose: () => void
}

const ProjectFormModal = ({
  title, form, fieldErrors, isPending, submitLabel, pendingLabel,
  serverError, onField, onSubmit, onClose,
}: ProjectFormModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
    <div className="bg-panel border border-rim rounded-lg w-full max-w-lg mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">{title}</h2>
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
              onChange={e => onField(key, e.target.value)}
              className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
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
              onChange={e => onField(key, e.target.value)}
              className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
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
            onChange={e => onField('category', e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
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
            onChange={e => onField('status', e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            {(Object.keys(statusLabel) as ProjectStatus[]).map(s => (
              <option key={s} value={s}>{statusLabel[s]}</option>
            ))}
          </select>
        </div>
      </div>

      {serverError && <p className="text-red-400 text-xs font-body">{serverError}</p>}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onSubmit}
          disabled={isPending}
          className="relative overflow-hidden flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? pendingLabel : submitLabel}
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

// ── Create Modal ──────────────────────────────────────────────────────────────

const CreateModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<ProjectInsert>({
    name: '', summary: '', description: '', cover_image: '',
    status: 'not_started', category: 'competition',
  })
  const [fieldErrors, setFieldErrors] = useState<ProjectFieldErrors>({})
  const { mutate: create, isPending, error: createError } = useCreateProject()

  const setField = (key: keyof ProjectInsert, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof ProjectFieldErrors]) {
      setFieldErrors(e => ({ ...e, [key]: undefined }))
    }
  }

  const handleSubmit = () => {
    const errors = validateProjectForm(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    create(
      { ...form, name: form.name.trim(), cover_image: form.cover_image.trim() },
      { onSuccess: onClose }
    )
  }

  return (
    <ProjectFormModal
      title="New Project"
      form={form}
      fieldErrors={fieldErrors}
      isPending={isPending}
      submitLabel="Create Project"
      pendingLabel="Creating..."
      serverError={createError ? 'Failed to create project' : null}
      onField={setField}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

// ── Delete Modal ──────────────────────────────────────────────────────────────

const DeleteModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { mutate: remove, isPending, error: deleteError } = useDeleteProject()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Delete Project</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted">
          Are you sure you want to delete <span className="text-copy font-medium">{project.name}</span>? This cannot be undone.
        </p>

        {deleteError && <p className="text-red-400 text-xs font-body">Failed to delete project</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => remove(project.id, { onSuccess: onClose })}
            disabled={isPending}
            className="relative overflow-hidden flex-1 py-2.5 rounded border border-red-400 text-red-400 text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-400/10 transition-colors duration-200"
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

// ── Main Page ─────────────────────────────────────────────────────────────────

const AdminProjects = () => {
  const { data: projects = [], isLoading } = useProjects()
  const [showCreate, setShowCreate] = useState(false)
  const [deleting, setDeleting] = useState<Project | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => projects
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => statusFilter === 'all' || p.status === statusFilter)
    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
    .sort((a, b) => a.name.localeCompare(b.name))
  , [projects, search, statusFilter, categoryFilter])

  return (
    <>
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
      {deleting && <DeleteModal project={deleting} onClose={() => setDeleting(null)} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Projects
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            className="relative overflow-hidden px-5 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + New Project
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ProjectStatus | 'all')}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="all">All Statuses</option>
            {(Object.keys(statusLabel) as ProjectStatus[]).map(s => (
              <option key={s} value={s}>{statusLabel[s]}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as ProjectCategory | 'all')}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="all">All Categories</option>
            {(Object.keys(categoryLabel) as ProjectCategory[]).map(c => (
              <option key={c} value={c}>{categoryLabel[c]}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-muted font-body text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted font-body text-sm">No projects found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((project: Project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40"
              >
                <Link to={`/u/admin/projects/${project.id}`} className="flex-1 min-w-0 hover:text-accent transition-colors duration-200">
                  <p className="font-body text-sm font-medium text-copy truncate">{project.name}</p>
                  <p className="font-body text-xs text-muted truncate">{project.summary}</p>
                </Link>

                <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 text-muted border-rim">
                  {categoryLabel[project.category]}
                </span>

                <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 ${statusStyle[project.status]}`}>
                  {statusLabel[project.status]}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setDeleting(project)}
                    className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminProjects
