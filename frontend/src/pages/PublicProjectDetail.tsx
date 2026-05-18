import { useParams, Link } from 'react-router-dom'
import { useProject } from '../hooks/projects/projects'
import { useProjectMembers } from '../hooks/projects/project-members'
import type { ProjectStatus, ProjectCategory } from '../types/projects/projects'

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

const PublicProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProject(id!)
  const { data: members = [] } = useProjectMembers(id!)

  if (isLoading) return (
    <div className="min-h-screen bg-void text-copy flex items-center justify-center">
      <p className="font-body text-sm text-muted">Loading...</p>
    </div>
  )

  if (isError || !project) return (
    <div className="min-h-screen bg-void text-copy flex flex-col items-center justify-center gap-4">
      <p className="font-body text-sm text-muted">Project not found.</p>
      <Link to="/projects" className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
        ← Back to Projects
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-void text-copy starfield pb-24">
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 pt-20">

        <Link
          to="/projects"
          className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-10"
        >
          ← Projects
        </Link>

        <div className="fade-up">
          {project.cover_image && (
            <div className="w-full aspect-video overflow-hidden border border-rim mb-10">
              <img src={project.cover_image} alt={project.name} className="w-full h-full object-cover [filter:brightness(0.8)_saturate(0.7)]" />
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent border border-accent/30 px-3 py-1">
              {categoryLabel[project.category]}
            </span>
            <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted border border-rim px-3 py-1">
              {statusLabel[project.status]}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy leading-[1.1] mb-6">
            {project.name}
          </h1>

          <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-8">
            {project.summary}
          </p>

          {project.description && (
            <div className="font-body text-sm text-muted leading-relaxed max-w-2xl border-t border-rim pt-8 whitespace-pre-wrap">
              {project.description}
            </div>
          )}
        </div>

        {members.length > 0 && (
          <div className="mt-16 fade-up">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-copy mb-6 section-underline">
              Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {members.map(member => (
                <div
                  key={member.member_id}
                  className="bg-surface border border-rim px-5 py-4 flex flex-col gap-1"
                >
                  <p className="font-display text-[0.6rem] uppercase tracking-widest text-accent">
                    {member.title}
                  </p>
                  <p className="font-body text-sm text-copy font-medium">
                    {member.member.name}
                  </p>
                  <p className="font-display text-[0.55rem] uppercase tracking-widest text-muted">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default PublicProjectDetail
