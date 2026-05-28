import { useState } from 'react'
import { useEvents } from '../../hooks/events'
import PublicEventGroup from '../../components/events/PublicEventGroup'

const PublicEventList = () => {
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false)
  const { data = [] } = useEvents()
  const now = new Date()
  const upcomingEvents = data.filter(e => new Date(e.start_time) > now)
  const ongoingEvents = data.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now)
  const pastEvents = data.filter(e => new Date(e.end_time) < now)

  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative pb-24">
      <h1 className="relative z-[1] font-display font-black uppercase tracking-[0.06em] pt-20 pb-8 px-6 md:px-16 max-w-[1300px] mx-auto border-b border-rim text-[clamp(2rem,5vw,3.5rem)]">
        <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent block mb-4 [background:none] [-webkit-text-fill-color:var(--color-accent)]">
          // EVENTS
        </span>
        Our Events
      </h1>
      <PublicEventGroup title="Ongoing" events={ongoingEvents} gold />
      <PublicEventGroup title="Upcoming" events={upcomingEvents} />
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 mt-8">
        <button
          className="block font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] py-3.5 px-10 bg-transparent text-muted border border-rim cursor-pointer transition-[color,border-color] duration-300 hover:text-copy hover:border-muted"
          onClick={() => setShowPastEvents(prev => !prev)}
        >
          {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
        </button>
      </div>
      {showPastEvents && <PublicEventGroup title="Past" events={pastEvents} muted />}
    </div>
  )
}

export default PublicEventList
