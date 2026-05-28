import { useParams, Link } from 'react-router-dom'
import { useEvent } from '../../hooks/events'
import { formatEventTime } from '../../utils/formatEventTime'

const PublicEventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: event, isLoading, isError } = useEvent(id!)

  if (isLoading) return (
    <div className="min-h-screen bg-void text-copy flex items-center justify-center">
      <p className="font-body text-sm text-muted">Loading...</p>
    </div>
  )

  if (isError || !event) return (
    <div className="min-h-screen bg-void text-copy flex flex-col items-center justify-center gap-4">
      <p className="font-body text-sm text-muted">Event not found.</p>
      <Link to="/events" className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
        ← Back to Events
      </Link>
    </div>
  )

  const eventTime = formatEventTime(event.start_time, event.end_time, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen bg-void text-copy pb-24">
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 pt-20">

        <Link
          to="/events"
          className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-10"
        >
          ← Events
        </Link>

        <div className="fade-up">
          {event.cover_image && (
            <div className="w-full aspect-video overflow-hidden border border-rim mb-10">
              <img src={event.cover_image} alt={event.name} className="w-full h-full object-cover [filter:brightness(0.8)_saturate(0.7)]" />
            </div>
          )}

          <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold mb-3">
            {eventTime}
          </p>
          <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted mb-6">
            {event.location}
          </p>

          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy leading-[1.1] mb-6">
            {event.name}
          </h1>

          {event.description && (
            <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-8">
              {event.description}
            </p>
          )}

          {event.content && (
            <div className="font-body text-sm text-muted leading-relaxed max-w-2xl border-t border-rim pt-8 whitespace-pre-wrap">
              {event.content}
            </div>
          )}

          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] py-3.5 px-10 bg-transparent text-accent border border-accent transition-[color,border-color] duration-300 hover:text-copy hover:border-copy"
            >
              Learn More →
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

export default PublicEventDetail
