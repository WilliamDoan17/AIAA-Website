import type { Event } from '../../../types/events'

type Props = { event: Event }

const LandingEventCard = ({ event }: Props) => {
  const start = new Date(event.start_time)
  const end = new Date(event.end_time)
  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="bg-panel border border-rim overflow-hidden relative transition-[border-color,box-shadow] duration-300 hover:border-gold hover:shadow-[0_0_30px_rgba(240,165,0,0.1)] group">
      <div className="w-full aspect-video overflow-hidden">
        {event.cover_image
          ? <img className="w-full h-full object-cover block [filter:brightness(0.7)_saturate(0.6)] transition-[filter] duration-300 group-hover:[filter:brightness(0.85)_saturate(0.9)]" src={event.cover_image} alt={event.name} />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <h4 className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold mx-6 mt-5 mb-1">
        {date} | {startTime} - {endTime}
      </h4>
      <h4 className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted mx-6 mb-0">
        {event.location}
      </h4>
      <h3 className="font-display text-[0.95rem] font-bold uppercase tracking-[0.06em] text-copy mx-6 my-3">
        {event.name}
      </h3>
      <p className="text-[0.9rem] leading-[1.65] text-muted mx-6 mb-6 font-light">
        {event.description}
      </p>
    </div>
  )
}

export default LandingEventCard
