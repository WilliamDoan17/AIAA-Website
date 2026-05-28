import type { Event, EventStatus } from '../../types/events'
import { formatEventTime } from '../../utils/formatEventTime'

const getEventStatus = (event: Event): EventStatus => {
  const now = Date.now()
  const start = new Date(event.start_time).getTime()
  const end = new Date(event.end_time).getTime()
  if (now < start) return 'upcoming'
  if (now > end) return 'completed'
  return 'ongoing'
}

const statusLabel: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
}

type Props = {
  event: Event
  onEdit: () => void
  onDelete: () => void
}

const AdminEventCard = ({ event, onEdit, onDelete }: Props) => {
  const status = getEventStatus(event)
  const eventTime = formatEventTime(event.start_time, event.end_time)

  return (
    <div className="flex items-center gap-4 bg-surface border border-rim rounded-xl px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40">
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-copy truncate">{event.name}</p>
        <p className="font-body text-xs text-muted truncate">
          {eventTime} · {event.location}
        </p>
      </div>

      <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded-xl border flex-shrink-0 ${
        status === 'ongoing'
          ? 'text-gold border-gold/30'
          : status === 'upcoming'
            ? 'text-accent border-accent/30'
            : 'text-muted border-rim'
      }`}>
        {statusLabel[status]}
      </span>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onEdit}
          className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdminEventCard
