import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProject } from '../../hooks/projects/projects'
import type { ProjectStatus, ProjectCategory } from '../../types/projects/projects'
import useAuth from '../../hooks/useAuth'
import ProjectInfoTab from '../../components/projects/info/ProjectInfoTab'
import ProjectMembersTab from '../../components/projects/members/ProjectMembersTab'
import ProjectPostsTab from '../../components/projects/posts/ProjectPostsTab'
import DeleteProjectModal from '../../components/projects/DeleteProjectModal'

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
type ModalState = { type: 'delete' } | null

const AdminProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { member } = useAuth()
  const navigate = useNavigate()
  const { data: project, isLoading, isError } = useProject(id!)
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const [modal, setModal] = useState<ModalState>(null)

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  if (isError || !project) return (
    <div className="flex flex-col gap-4">
      <p className="text-muted font-body text-sm">Project not found.</p>
      <Link to="/u/admin/projects" className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
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
    <>
      {modal?.type === 'delete' && (
        <DeleteProjectModal
          project={project}
          onClose={() => setModal(null)}
          onSuccess={() => navigate('/u/admin/projects')}
        />
      )}

      <div className="max-w-3xl">
        <Link
          to="/u/admin/projects"
          className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-8"
        >
          ← Projects
        </Link>

        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded-xl border text-muted border-rim">
                {categoryLabel[project.category]}
              </span>
              <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded-xl border ${statusStyle[project.status]}`}>
                {statusLabel[project.status]}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-copy">
              {project.name}
            </h1>
          </div>
          <button
            onClick={() => setModal({ type: 'delete' })}
            className="flex-shrink-0 px-4 py-2 rounded-xl border border-rim text-muted text-xs font-body hover:text-red-400 hover:border-red-400/40 transition-colors duration-200"
          >
            Delete
          </button>
        </div>

        <div className="flex gap-6 border-b border-rim mb-8 mt-6">
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

        <div className={activeTab === 'info' ? '' : 'hidden'}><ProjectInfoTab project={project} /></div>
        <div className={activeTab === 'members' ? '' : 'hidden'}><ProjectMembersTab projectId={project.id} canManage={true} /></div>
        <div className={activeTab === 'posts' ? '' : 'hidden'}><ProjectPostsTab projectId={project.id} memberId={member!.id} canManage={true} basePath={`/u/admin/projects/${project.id}`} /></div>
      </div>
    </>
  )
}

export default AdminProjectDetail
