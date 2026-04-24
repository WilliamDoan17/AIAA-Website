import { useState } from 'react'
import useEvents from '../hooks/useEvents'

const EventCard = ({ event }) => {
  const start = new Date(event.start_time)
  const end = new Date(event.end_time)
  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="bg-panel border border-rim overflow-hidden relative transition-[border-color,box-shadow,transform] duration-300 cursor-pointer hover:border-gold hover:shadow-[0_0_30px_rgba(240,165,0,0.08)] hover:-translate-y-1 fade-up group">
      <div className="w-full aspect-video overflow-hidden">
        {event.cover_image
          ? <img className="w-full h-full object-cover block [filter:brightness(0.7)_saturate(0.6)] transition-[filter] duration-300 group-hover:[filter:brightness(0.9)_saturate(1)]" src={event.cover_image} alt={event.name} />
          : <div className="w-full h-full bg-rim min-h-[157px]" />
        }
      </div>
      <h4 className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold mx-6 mt-5 mb-1">
        {date} | {startTime} - {endTime}
      </h4>
      <h4 className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted mx-6 mb-0">
        {event.location}
      </h4>
      <h3 className="font-display text-[0.9rem] font-bold uppercase tracking-[0.06em] text-copy mx-6 my-3">
        {event.name}
      </h3>
      <p className="text-[0.88rem] leading-[1.65] text-muted mx-6 mb-6 font-light">
        {event.summary}
      </p>
    </div>
  )
}

const EventGroup = ({ title, events, gold = false, muted = false }) => {
  if (events.length === 0) return null
  return (
    <div className={`relative z-[1] max-w-[1300px] mx-auto pt-16 pb-8 px-6 md:px-16 ${muted ? 'opacity-60' : ''}`}>
      <h2 className={`font-display text-[clamp(1rem,2vw,1.4rem)] font-bold uppercase tracking-[0.12em] mb-8 ${gold ? 'text-gold section-underline-gold' : 'text-copy section-underline'}`}>
        {title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

const Events = () => {
  const [showPastEvents, setShowPastEvents] = useState(false)
  const { data = [], loading, error } = useEvents()
  const now = new Date()
  const upcomingEvents = data.filter(e => new Date(e.start_time) > now)
  const ongoingEvents = data.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now)
  const pastEvents = data.filter(e => new Date(e.end_time) < now)

  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative pb-24 starfield">
      <h1 className="relative z-[1] font-display font-black uppercase tracking-[0.06em] pt-20 pb-8 px-6 md:px-16 max-w-[1300px] mx-auto border-b border-rim heading-gradient fade-up-slow text-[clamp(2rem,5vw,3.5rem)]">
        <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent block mb-4 [background:none] [-webkit-text-fill-color:var(--color-accent)]">
          // EVENTS
        </span>
        Our Events
      </h1>
      <EventGroup title="Ongoing" events={ongoingEvents} gold />
      <EventGroup title="Upcoming" events={upcomingEvents} />
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 mt-8">
        <button
          className="block font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] py-3.5 px-10 bg-transparent text-muted border border-rim cursor-pointer [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] transition-[color,border-color] duration-300 hover:text-copy hover:border-muted"
          onClick={() => setShowPastEvents(prev => !prev)}
        >
          {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
        </button>
      </div>
      {showPastEvents && <EventGroup title="Past" events={pastEvents} muted />}
    </div>
  )
}

export default Events
