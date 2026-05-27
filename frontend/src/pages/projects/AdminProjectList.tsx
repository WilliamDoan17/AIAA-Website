import { useState, useMemo } from 'react'
import { useProjects } from '../../hooks/projects/projects'
import type { Project, ProjectStatus, ProjectCategory } from '../../types/projects/projects'
import CreateProjectModal from '../../components/projects/CreateProjectModal'
import DeleteProjectModal from '../../components/projects/DeleteProjectModal'
import AdminProjectCard from '../../components/projects/AdminProjectCard'
import ProjectFilter from '../../components/projects/ProjectFilter'

type ModalState =
  | { type: 'create' }
  | { type: 'delete'; project: Project }
  | null

const AdminProjectList = () => {
  const { data: projects = [], isLoading } = useProjects()
  const [modal, setModal] = useState<ModalState>(null)
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
      {modal?.type === 'create' && <CreateProjectModal onClose={() => setModal(null)} />}
      {modal?.type === 'delete' && <DeleteProjectModal project={modal.project} onClose={() => setModal(null)} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Projects
          </h1>
          <button
            onClick={() => setModal({ type: 'create' })}
            className="relative overflow-hidden px-5 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + New Project
          </button>
        </div>

        <ProjectFilter
          search={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilter={setCategoryFilter}
        />

        {isLoading ? (
          <p className="text-muted font-body text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted font-body text-sm">No projects found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((project: Project) => (
              <AdminProjectCard
                key={project.id}
                project={project}
                onDelete={() => setModal({ type: 'delete', project })}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminProjectList
