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

interface ProjectFilterProps {
  search: string
  onSearch: (value: string) => void
  statusFilter: ProjectStatus | 'all'
  onStatusFilter: (value: ProjectStatus | 'all') => void
  categoryFilter: ProjectCategory | 'all'
  onCategoryFilter: (value: ProjectCategory | 'all') => void
}

const ProjectFilter = ({ search, onSearch, statusFilter, onStatusFilter, categoryFilter, onCategoryFilter }: ProjectFilterProps) => (
  <div className="flex flex-wrap gap-3 mb-6">
    <input
      type="text"
      placeholder="Search projects..."
      value={search}
      onChange={e => onSearch(e.target.value)}
      className="bg-surface border border-rim rounded-xl px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
    />
    <select
      value={statusFilter}
      onChange={e => onStatusFilter(e.target.value as ProjectStatus | 'all')}
      className="bg-surface border border-rim rounded-xl px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
    >
      <option value="all">All Statuses</option>
      {(Object.keys(statusLabel) as ProjectStatus[]).map(s => (
        <option key={s} value={s}>{statusLabel[s]}</option>
      ))}
    </select>
    <select
      value={categoryFilter}
      onChange={e => onCategoryFilter(e.target.value as ProjectCategory | 'all')}
      className="bg-surface border border-rim rounded-xl px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
    >
      <option value="all">All Categories</option>
      {(Object.keys(categoryLabel) as ProjectCategory[]).map(c => (
        <option key={c} value={c}>{categoryLabel[c]}</option>
      ))}
    </select>
  </div>
)

export default ProjectFilter
