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

interface OfficerProjectCardProps {
  project: Project
}

const OfficerProjectCard = ({ project }: OfficerProjectCardProps) => (
  <Link
    to={`/u/officer/projects/${project.id}`}
    className="flex items-center gap-5 bg-surface border border-rim rounded px-5 py-4 hover:border-accent/50 transition-colors duration-200 group"
  >
    <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded bg-rim">
      {project.cover_image
        ? <img src={project.cover_image} alt={project.name} className="w-full h-full object-cover" />
        : <div className="w-full h-full bg-rim" />
      }
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-display text-sm font-bold uppercase tracking-wide text-copy group-hover:text-accent transition-colors duration-200 truncate">
        {project.name}
      </p>
      <p className="font-body text-xs text-muted truncate mt-0.5">{project.summary}</p>
    </div>
    <div className="flex gap-2 flex-shrink-0">
      <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border text-muted border-rim">
        {categoryLabel[project.category]}
      </span>
      <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border ${statusStyle[project.status]}`}>
        {statusLabel[project.status]}
      </span>
    </div>
  </Link>
)

export default OfficerProjectCard
