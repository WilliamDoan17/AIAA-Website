import type { Event } from '../../types/events'
import PublicEventCard from './PublicEventCard'

type Props = { title: string; events: Event[]; gold?: boolean; muted?: boolean }

const PublicEventGroup = ({ title, events, gold = false, muted = false }: Props) => {
  if (events.length === 0) return null
  return (
    <div className={`relative z-[1] max-w-[1300px] mx-auto pt-16 pb-8 px-6 md:px-16 ${muted ? 'opacity-60' : ''}`}>
      <h2 className={`font-display text-[clamp(1rem,2vw,1.4rem)] font-bold uppercase tracking-[0.12em] mb-8 ${gold ? 'text-gold section-underline-gold' : 'text-copy section-underline'}`}>
        {title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {events.map(event => (
          <PublicEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default PublicEventGroup
