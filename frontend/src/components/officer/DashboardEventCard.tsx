import type { Event } from '../../types/events'

type Props = { event: Event }

const DashboardEventCard = ({ event }: Props) => {
  const start = new Date(event.start_time)
  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="flex items-center gap-4 bg-surface border border-rim rounded-xl px-5 py-4 transition-[border-color] duration-200 hover:border-gold/40">
      <div className="flex-shrink-0 text-center w-12">
        <p className="font-display text-[0.6rem] uppercase tracking-widest text-gold">{date}</p>
        <p className="font-display text-[0.6rem] uppercase tracking-widest text-muted">{startTime}</p>
      </div>
      <div className="w-px h-8 bg-rim flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-copy truncate">{event.name}</p>
        <p className="font-body text-xs text-muted truncate mt-0.5">{event.location}</p>
      </div>
    </div>
  )
}

export default DashboardEventCard
