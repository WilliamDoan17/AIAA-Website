import useEvents from '../../hooks/useEvents'
import styles from './index.module.css'

const EventCard = ({ event }) => {
  return (
    <div
      className={styles.EventCard}
    >
    </div>
  )
}

const PastEvents = ({ events }) => {
  return (
    <div
      className={styles.PastEvents}
    >
    </div>
  )
}

const UpcomingEvents = ({ events }) => {
  return (
    <div
      className={styles.UpcomingEvents}
    >

    </div>
  )
}

const OngoingEvents = ({ events }) => {
  return (
    <div
      className={styles.OngoingEvents}
    >
    </div>
  )
}

const Events = () => {
  const { data, loading, error } = useEvents();
  const now = new Date();
  const upcomingEvents = data.filter(event => { return new Date(event.start_time > now); })
  const ongoingEvents = data.filter(event => new Date(event.start_time) <= now && new Date(event.end_time) >= now)
  const pastEvents = data.filter(event => new Date(event.end_time) < now)

  return (
    <div
      className={styles.Events}
    >
      <h1>
        Our Events
      </h1>
      <OngoingEvents events={ongoingEvents} />
      <UpcomingEvents events={upcomingEvents} />
      <PastEvents events={pastEvents} />
    </div>
  )
}

export default Events

