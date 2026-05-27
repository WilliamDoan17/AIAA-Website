import { Link } from 'react-router-dom'
import type { Project, ProjectStatus, ProjectCategory } from '../../types/projects/projects'

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

interface AdminProjectCardProps {
  project: Project
  onDelete: () => void
}

const AdminProjectCard = ({ project, onDelete }: AdminProjectCardProps) => (
  <div className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40">
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
        onClick={onDelete}
        className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
      >
        Delete
      </button>
    </div>
  </div>
)

export default AdminProjectCard
