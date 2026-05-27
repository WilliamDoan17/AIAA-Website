import { Link } from 'react-router-dom'
import type { Project } from '../../types/projects'

type FilterOptions = Record<string, string[]>

const FilterTag = ({ value }: { value: string }) => (
  <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-accent border border-accent-dim bg-accent-dim px-3 py-1 [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]">
    {value}
  </span>
)

interface PublicProjectCardProps {
  project: Project
  filterOptions: FilterOptions
}

const PublicProjectCard = ({ project, filterOptions }: PublicProjectCardProps) => (
  <Link
    to={`/projects/${project.id}`}
    className="flex flex-col md:flex-row items-stretch w-full bg-panel border border-rim overflow-hidden relative transition-[border-color,transform] duration-300 mb-4 card-accent hover:border-accent hover:translate-x-1 fade-up group"
  >
    <div className="w-full md:w-[280px] flex-shrink-0 overflow-hidden">
      {project.cover_image
        ? <img className="w-full h-full object-cover block [filter:brightness(0.75)_saturate(0.8)] transition-[filter] duration-300 group-hover:[filter:brightness(0.9)_saturate(1)]" src={project.cover_image} alt={project.name} />
        : <div className="w-full h-full bg-rim min-h-[160px]" />
      }
    </div>
    <div className="flex-1 p-8 md:px-10 flex flex-col justify-center gap-3">
      <h3 className="font-display text-[1.1rem] font-bold uppercase tracking-[0.08em] text-copy m-0">
        {project.name}
      </h3>
      <p className="text-[0.95rem] leading-[1.7] text-muted m-0 font-light max-w-[680px]">
        {project.summary}
      </p>
      <div className="flex flex-row gap-2 mt-2">
        {(Object.keys(filterOptions) as Array<keyof Project>).map((key) => (
          <FilterTag key={String(key)} value={String(project[key])} />
        ))}
      </div>
    </div>
  </Link>
)

export default PublicProjectCard
