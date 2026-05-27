import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useMemberProjects } from '../../hooks/projects/projects'
import type { ProjectStatus, ProjectCategory } from '../../types/projects/projects'

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

const MemberProjects = () => {
  const { member } = useAuth()
  const { data: projects = [], isLoading } = useMemberProjects(member!.id)

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-copy mb-8">
        My Projects
      </h1>

      {isLoading ? (
        <p className="font-body text-sm text-muted">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="font-body text-sm text-muted">You haven't been assigned to any projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map(project => (
            <Link
              key={project.id}
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
          ))}
        </div>
      )}
    </div>
  )
}

export default MemberProjects
