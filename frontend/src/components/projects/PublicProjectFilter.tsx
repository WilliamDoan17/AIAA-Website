import type React from 'react'

type FilterOptions = Record<string, string[]>
type Filters = { category: string; status: string }

interface PublicProjectFilterProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  filterOptions: FilterOptions
}

const PublicProjectFilter = ({ filters, setFilters, filterOptions }: PublicProjectFilterProps) => (
  <div className="relative z-[1] flex flex-row flex-wrap items-center gap-8 px-6 md:px-16 py-6 max-w-[1300px] mx-auto border-b border-rim">
    {Object.entries(filterOptions).map(([key, options]) => (
      <div key={key} className="flex items-center gap-3">
        <label className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
          {key}:
        </label>
        <select
          value={filters[key as keyof Filters]}
          onChange={(e) => setFilters(f => ({ ...f, [key]: e.target.value }))}
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

export default PublicProjectFilter
