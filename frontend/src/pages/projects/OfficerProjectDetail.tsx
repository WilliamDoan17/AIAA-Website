import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../hooks/projects/projects'
import { useProjectMembers } from '../../hooks/projects/project-members'
import useAuth from '../../hooks/useAuth'
import type { ProjectStatus, ProjectCategory } from '../../types/projects/projects'
import ProjectInfoView from '../../components/projects/info/ProjectInfoView'
import ProjectMembersTab from '../../components/projects/members/ProjectMembersTab'
import ProjectPostsTab from '../../components/projects/posts/ProjectPostsTab'

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

type Tab = 'info' | 'members' | 'posts'

const OfficerProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { member } = useAuth()
  const { data: project, isLoading, isError } = useProject(id!)
  const { data: projectMembers = [] } = useProjectMembers(id!)
  const [activeTab, setActiveTab] = useState<Tab>('info')

  const canManage = useMemo(
    () => projectMembers.some(m => m.member_id === member?.id && m.role === 'admin'),
    [projectMembers, member]
  )

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  if (isError || !project) return (
    <div className="flex flex-col gap-4">
      <p className="text-muted font-body text-sm">Project not found.</p>
      <Link to="/u/officer/projects" className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
        ← Projects
      </Link>
    </div>
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Info' },
    { key: 'members', label: 'Members' },
    { key: 'posts', label: 'Posts' },
  ]

  return (
    <div className="max-w-3xl">
      <Link
        to="/u/officer/projects"
        className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-8"
      >
        ← Projects
      </Link>

      <div className="flex gap-2 mb-3">
        <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border text-muted border-rim">
          {categoryLabel[project.category]}
        </span>
        <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border ${statusStyle[project.status]}`}>
          {statusLabel[project.status]}
        </span>
      </div>

      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-copy mb-6">
        {project.name}
      </h1>

      <div className="flex gap-6 border-b border-rim mb-8">
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

      <div className={activeTab === 'info' ? '' : 'hidden'}><ProjectInfoView project={project} /></div>
      <div className={activeTab === 'members' ? '' : 'hidden'}><ProjectMembersTab projectId={project.id} canManage={canManage} /></div>
      <div className={activeTab === 'posts' ? '' : 'hidden'}><ProjectPostsTab projectId={project.id} memberId={member!.id} canManage={canManage} basePath={`/u/officer/projects/${project.id}`} /></div>
    </div>
  )
}

export default OfficerProjectDetail
