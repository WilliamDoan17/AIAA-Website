import { useState } from 'react'
import useEvents from '../../hooks/useEvents'
import styles from './index.module.css'

const EventCard = ({ event }) => {
  const start = new Date(event.start_time)
  const end = new Date(event.end_time)

  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <>
      <div
        className={styles.EventCard}
      >
        <img
          src={event.cover_image}
        >
        </img>
        <h4>
          {date} | {startTime} - {endTime}
        </h4>
        <h4>
          {event.location}
        </h4>
        <h3>
          {event.name}
        </h3>
        <p>
          {event.summary}
        </p>
      </div>
    </>
  )
}

const PastEvents = ({ events }) => {
  return (
    <div
      className={styles.PastEvents}
    >
      <h2>
        Past
      </h2>
      <div
        className={styles.EventGrid}
      >
        {
          events.map(event => {
            return (
              <EventCard
                key={event.id}
                event={event}
              ></EventCard>
            )
          })
        }
      </div>
    </div>
  )
}

const UpcomingEvents = ({ events }) => {
  return (
    <div
      className={styles.UpcomingEvents}
    >
      <h2>
        Upcoming
      </h2>
      <div
        className={styles.EventGrid}
      >
        {
          events.map(event => {
            return (
              <EventCard
                key={event.id}
                event={event}
              ></EventCard>
            )
          })
        }
      </div>
    </div>
  )
}

const OngoingEvents = ({ events }) => {
  return (
    <div
      className={styles.OngoingEvents}
    >
      <h2>
        Ongoing
      </h2>
      <div
        className={styles.EventGrid}
      >
        {
          events.map(event => {
            return (
              <EventCard
                key={event.id}
                event={event}
              ></EventCard>
            )
          })
        }
      </div>
    </div >
  )
}

const Events = () => {
  const { data = [], loading, error } = useEvents();
  const now = new Date();
  const upcomingEvents = data.filter(event => new Date(event.start_time) > now)
  const ongoingEvents = data.filter(event => new Date(event.start_time) <= now && new Date(event.end_time) >= now)
  const pastEvents = data.filter(event => new Date(event.end_time) < now)
  const [showPastEvents, setShowPastEvents] = useState(false);

  return (
    <div
      className={styles.Events}
    >
      <h1>
        Our Events
      </h1>
      <OngoingEvents events={ongoingEvents} />
      <UpcomingEvents events={upcomingEvents} />
      <button
        className={styles.ShowPastButton}
        onClick={() => {
          setShowPastEvents(prev => !prev)
        }}
      >
        {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
      </button>
      {showPastEvents && <PastEvents events={pastEvents} />}
    </div>
  )
}

export default Events

