import { useDeleteProject } from '../../hooks/projects/projects'
import type { Project } from '../../types/projects/projects'

interface DeleteProjectModalProps {
  project: Project
  onClose: () => void
  onSuccess?: () => void
}

const DeleteProjectModal = ({ project, onClose, onSuccess }: DeleteProjectModalProps) => {
  const { mutate: remove, isPending, error: deleteError } = useDeleteProject()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
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
            onClick={() => remove(project.id, { onSuccess: onSuccess ?? onClose })}
            disabled={isPending}
            className="relative overflow-hidden flex-1 py-2.5 rounded-xl border border-red-400 text-red-400 text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-400/10 transition-colors duration-200"
          >
            {isPending ? 'Deleting...' : 'Delete'}
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

export default DeleteProjectModal
