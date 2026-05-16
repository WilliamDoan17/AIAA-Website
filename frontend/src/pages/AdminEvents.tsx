import { useState, useMemo } from 'react'
import { useEvents } from '../hooks/events'
import type { Event } from '../types/events'

const statusLabel: Record<Event['status'], string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
}

const AdminEvents = () => {
  const { data: events = [], isLoading: loading } = useEvents()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => events
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => statusFilter === 'all' || e.status === statusFilter)
    , [events, search, statusFilter])

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
          Events
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-muted font-body text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted font-body text-sm">No events found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(event => {
            const start = new Date(event.start_time)
            const end = new Date(event.end_time)
            const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

            return (
              <div
                key={event.id}
                className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-copy truncate">{event.name}</p>
                  <p className="font-body text-xs text-muted truncate">
                    {date} · {startTime} – {endTime} · {event.location}
                  </p>
                </div>

                <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 ${event.status === 'ongoing'
                  ? 'text-gold border-gold/30'
                  : event.status === 'upcoming'
                    ? 'text-accent border-accent/30'
                    : 'text-muted border-rim'
                  }`}>
                  {statusLabel[event.status]}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminEvents
