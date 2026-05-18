import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../hooks/projects/projects'
import type { ProjectStatus, ProjectCategory } from '../types/projects/projects'
import ProjectInfoTab from '../components/projects/ProjectInfoTab'
import ProjectMembersTab from '../components/projects/ProjectMembersTab'

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

type Tab = 'info' | 'members'

const PublicProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProject(id!)
  const [activeTab, setActiveTab] = useState<Tab>('info')

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

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Info' },
    { key: 'members', label: 'Members' },
  ]

  return (
    <div className="min-h-screen bg-void text-copy starfield pb-24">
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 pt-20">

        <Link
          to="/projects"
          className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-10"
        >
          ← Projects
        </Link>

        <div className="flex gap-3 mb-4">
          <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent border border-accent/30 px-3 py-1">
            {categoryLabel[project.category]}
          </span>
          <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted border border-rim px-3 py-1">
            {statusLabel[project.status]}
          </span>
        </div>

        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy leading-[1.1] mb-8">
          {project.name}
        </h1>

        <div className="flex gap-8 border-b border-rim mb-10">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-display text-xs uppercase tracking-widest pb-3 border-b-2 transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'text-accent border-accent'
                  : 'text-muted border-transparent hover:text-copy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && <ProjectInfoTab project={project} canEdit={false} />}
        {activeTab === 'members' && <ProjectMembersTab projectId={project.id} canManage={false} />}

      </div>
    </div>
  )
}

export default PublicProjectDetail
