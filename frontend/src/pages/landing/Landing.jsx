import styles from "./Landing.module.css"
import useProjects from "../../hooks/useProjects.js"
import useEvents from '../../hooks/useEvents.js'
import { useMembers } from "../../hooks/useMembers.js"

const MemberCard = ({ member }) => {
  const formatRole = (role) => role.replace(/_/g, ' ').toUpperCase()
  return (
    <div className={styles.MemberCard}>
      <div className={styles.MemberCardImage}>
        {member.photo
          ? <img src={member.photo} alt={member.name} />
          : <div className={styles.MemberCardImagePlaceholder} />
        }
      </div>
      <h3>{member.name}</h3>
      <p>{formatRole(member.role)}</p>
    </div>
  )
}

const MemberSection = () => {
  const { data = [], loading, error } = useMembers();

  return (
    <div className={styles.MemberSection}>
      <h2>Our Team</h2>
      <div className={styles.MemberContainer}>
        {data.map(member => (
          <MemberCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </div>
  )
}

const EventCard = ({ event }) => {
  const start = new Date(event.start_time)
  const end = new Date(event.end_time)

  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className={styles.EventCard}>
      <div className={styles.EventCardImage}>
        {event.cover_image
          ? <img src={event.cover_image} alt={event.name} />
          : <div className={styles.EventCardImagePlaceholder} />
        }
      </div>
      <h4>{date} | {startTime} - {endTime}</h4>
      <h4>{event.location}</h4>
      <h3>{event.name}</h3>
      <p>{event.summary}</p>
    </div>
  )
}

const EventSection = () => {
  const { data = [] } = useEvents()
  const now = new Date()
  const displayed = [
    ...data.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now),
    ...data.filter(e => new Date(e.start_time) > now)
  ]

  return (
    <div className={styles.EventSection}>
      <h2>Events</h2>
      <div className={styles.EventContainer}>
        {displayed.map(event => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  )
}

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.ProjectCard}>
      <div className={styles.ProjectCardImage}>
        {project.cover_image
          ? <img src={project.cover_image} alt={project.name} />
          : <div className={styles.ProjectCardImagePlaceholder} />
        }
      </div>
      <div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
    </div>
  )
}

const ProjectSection = () => {
  const { data: projects = [], loading, error } = useProjects();
  return (
    <div className={styles.ProjectSection}>
      <h1>Our Projects</h1>
      <div className={styles.ProjectContainer}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className={styles.HeroSection}>
      <h1>
        American Institute of Aeronautics and Astronautics at USF
      </h1>
      <h3>
        Become part of our vibrant community
      </h3>
      <button className={styles.CTAButton}>
        Join Now
      </button>
    </div>
  )
}

const AboutSection = () => {
  return (
    <div className={styles.AboutSection}>
      <h1>
        Hi, we're the American Institute of Aeronautics and Astronautics!
      </h1>
      <p>
        Joining us means diving straight into real aerospace engineering challenges that you won't find in the classroom. Whether we're creating a custom aircraft for the Student Unmanned Aerial Systems competition or building astronaut hardware that NASA will test in microgravity, every project challenges us to think creatively and work as a team. Along the way, you'll gain hands-on technical skills, connect with industry professionals, and become part of a community who shares your passion for flight and space. It's exciting, rewarding, and an experience that will stay with you far beyond graduation."
      </p>
      <p>
        We currently has 2 major projects. SUAS an autonamous long range drone for hurricane recovery and COSMIC a satelite robotic arm for in space manufacturing to be presented to NASA in April.
      </p>
      <p>
        We are a newer club, only about a year old, so every member is assigned tasks and everything is very hands on. Great time to join cause this semester will be a large push for manufacturing!
      </p>
    </div>
  )
}

const Landing = () => {
  return (
    <div className={styles.Landing}>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <EventSection />
      <MemberSection />
    </div>
  )
}

export default Landing
