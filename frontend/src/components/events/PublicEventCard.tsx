import { Link } from 'react-router-dom'
import type { Event } from '../../types/events'
import { formatEventTime } from '../../utils/formatEventTime'

type Props = { event: Event }

const PublicEventCard = ({ event }: Props) => (
  <Link to={`/events/${event.id}`} className="bg-panel border border-rim overflow-hidden relative transition-[border-color,box-shadow,transform] duration-300 cursor-pointer hover:border-gold hover:shadow-[0_0_30px_rgba(240,165,0,0.08)] hover:-translate-y-1 fade-up group">
    <div className="w-full aspect-video overflow-hidden">
      {event.cover_image
        ? <img className="w-full h-full object-cover block [filter:brightness(0.7)_saturate(0.6)] transition-[filter] duration-300 group-hover:[filter:brightness(0.9)_saturate(1)]" src={event.cover_image} alt={event.name} />
        : <div className="w-full h-full bg-rim min-h-[157px]" />
      }
    </div>
    <h4 className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold mx-6 mt-5 mb-1">
      {formatEventTime(event.start_time, event.end_time, { month: 'short', day: 'numeric' })}
    </h4>
    <h4 className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted mx-6 mb-0">
      {event.location}
    </h4>
    <h3 className="font-display text-[0.9rem] font-bold uppercase tracking-[0.06em] text-copy mx-6 my-3">
      {event.name}
    </h3>
    <p className="text-[0.88rem] leading-[1.65] text-muted mx-6 mb-6 font-light">
      {event.description}
    </p>
  </Link>
)

export default PublicEventCard
