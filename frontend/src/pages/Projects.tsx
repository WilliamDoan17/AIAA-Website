import { useState, useMemo } from 'react'
import type React from 'react'
import useProjects from '../hooks/useProjects'
import type { Project } from '../types/project'

type FilterOptions = Record<string, string[]>
type Filters = { category: string; status: string }

const FilterTag = ({ value }: { value: string }) => (
  <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-accent border border-accent-dim bg-accent-dim px-3 py-1 [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]">
    {value}
  </span>
)

const ProjectCard = ({ project, filterOptions }: { project: Project; filterOptions: FilterOptions }) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch w-full bg-panel border border-rim overflow-hidden relative transition-[border-color,transform] duration-300 cursor-pointer mb-4 card-accent hover:border-accent hover:translate-x-1 fade-up group">
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
    </div>
  )
}

const ProjectContainer = ({ projects, filterOptions }: { projects: Project[]; filterOptions: FilterOptions }) => {
  if (projects.length === 0) return (
    <p className="font-display text-xs tracking-[0.2em] uppercase text-muted text-center py-16">
      No projects found.
    </p>
  )
  return (
    <div className="relative z-[1] flex flex-col gap-px max-w-[1300px] mx-auto px-6 md:px-16 pt-8 pb-24">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} filterOptions={filterOptions} />
      ))}
    </div>
  )
}

const FilterBar = ({ filters, setFilters, filterOptions }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>>; filterOptions: FilterOptions }) => {
  const handleChangeFilter = (key: string, value: string) => setFilters({ ...filters, [key]: value })
  return (
    <div className="relative z-[1] flex flex-row flex-wrap items-center gap-8 px-6 md:px-16 py-6 max-w-[1300px] mx-auto border-b border-rim">
      {Object.entries(filterOptions).map(([key, options]) => (
        <div key={key} className="flex items-center gap-3">
          <label className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
            {key}:
          </label>
          <select
            value={filters[key as keyof Filters]}
            onChange={(e) => handleChangeFilter(key, e.target.value)}
            className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-copy bg-panel border border-rim px-4 py-2 cursor-pointer outline-none transition-[border-color] duration-300 appearance-none [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] hover:border-accent focus:border-accent"
          >
            {options.map(option => (
              <option key={option} value={option} className="bg-panel text-copy">
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

const Projects = () => {
  const { data = [] } = useProjects()

  const filterOptions = useMemo(() => ({
    category: ['all', ...new Set(data.map(p => p.category))],
    status: ['all', ...new Set(data.map(p => p.status))],
  }), [data])

  const [filters, setFilters] = useState<{ category: string; status: string }>({ category: 'all', status: 'all' })

  const filtered = useMemo(() => data
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => filters.status === 'all' || p.status === filters.status)
    , [data, filters])

  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative starfield">
      <div className="relative z-[1] pt-20 pb-8 px-6 md:px-16 max-w-[1300px] mx-auto border-b border-rim">
        <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent uppercase block mb-4">
          // PROJECTS
        </span>
        <h1 className="font-display font-black uppercase tracking-[0.06em] m-0 mb-3 heading-gradient fade-up-slow text-[clamp(2rem,5vw,3.5rem)]">
          Projects
        </h1>
        <p className="font-body text-base font-light text-muted tracking-[0.15em] uppercase m-0 fade-up-slow-d1">
          Explore what we're working on
        </p>
      </div>
      <FilterBar filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
      <ProjectContainer projects={filtered} filterOptions={filterOptions} />
    </div>
  )
}

export default Projects
