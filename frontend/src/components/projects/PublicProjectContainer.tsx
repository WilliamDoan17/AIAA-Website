import type { Project } from '../../types/projects'
import PublicProjectCard from './PublicProjectCard'

type FilterOptions = Record<string, string[]>

interface PublicProjectContainerProps {
  projects: Project[]
  filterOptions: FilterOptions
}

const PublicProjectContainer = ({ projects, filterOptions }: PublicProjectContainerProps) => {
  if (projects.length === 0) return (
    <p className="font-display text-xs tracking-[0.2em] uppercase text-muted text-center py-16">
      No projects found.
    </p>
  )
  return (
    <div className="relative z-[1] flex flex-col gap-px max-w-[1300px] mx-auto px-6 md:px-16 pt-8 pb-24">
      {projects.map(project => (
        <PublicProjectCard key={project.id} project={project} filterOptions={filterOptions} />
      ))}
    </div>
  )
}

export default PublicProjectContainer
