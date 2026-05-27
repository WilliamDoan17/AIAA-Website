import { useState, useMemo } from 'react'
import { useProjects } from '../../hooks/projects/projects'
import PublicProjectFilter from '../../components/projects/PublicProjectFilter'
import PublicProjectContainer from '../../components/projects/PublicProjectContainer'

type Filters = { category: string; status: string }

const PublicProjectList = () => {
  const { data = [] } = useProjects()

  const filterOptions = useMemo(() => ({
    category: ['all', ...new Set(data.map(p => p.category))],
    status: ['all', ...new Set(data.map(p => p.status))],
  }), [data])

  const [filters, setFilters] = useState<Filters>({ category: 'all', status: 'all' })

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
      <PublicProjectFilter filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
      <PublicProjectContainer projects={filtered} filterOptions={filterOptions} />
    </div>
  )
}

export default PublicProjectList
