import Navbar from "../../components/Navbar.jsx"
import Footer from "../../components/Footer.jsx"
import styles from "./Landing.module.css"
import useProjects from "../../hooks/useProjects.js"
import useEvents from '../../hooks/useEvents.js'
import { useMembers } from "../../hooks/useMembers.js"

const MemberCard = ({ member }) => {
  return (
    <>
      <div
        className={styles.MemberCard}
      >
        <img
          src={member.photo}
        ></img>
        <h3>
          {member.name}
        </h3>
        <p>
          {member.role}
        </p>
      </div>
    </>
  )
}

const MemberSection = () => {
  const { data, loading, error } = useMembers();

  return (
    <>
      <div
        className={styles.MemberSection}
      >
        <h2>
          Our Team
        </h2>
        <div
          className={styles.MemberContainer}
        >
          {
            data.map(member => (
              <MemberCard
                key={member.id}
                member={member}
              ></MemberCard>
            ))
          }
        </div>
      </div>
    </>
  )
}

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

const EventSection = () => {
  const { data, loading, error } = useEvents();

  return (
    <>
      <div
        className={styles.EventSection}
      >
        <h2>
          UpcomingEvents Events
        </h2>
        <div
          className={styles.EventContainer}
        >
          {
            data.map(event => (
              <EventCard
                key={event.id}
                event={event}
              >
              </EventCard>
            ))
          }
        </div>
      </div>
    </>
  )
}

const ProjectCard = ({ project }) => {
  return (
    <>
      <div
        className={styles.ProjectCard}
      >
        <img
          src={project.cover_image}
        ></img>
        <div>
          <h3>
            {project.name}
          </h3>
          <p>
            {project.summary}
          </p>
        </div>
      </div>
    </>
  )
}

const ProjectSection = () => {
  const { data: projects, loading, error } = useProjects();
  return (
    <>
      <div
        className={styles.ProjectSection}
      >
        <h1>
          Our Projects
        </h1>
        <div
          className={styles.ProjectContainer}
        >
          {/* notes: use flexbox or grid to align the project card */}
          {
            projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
              ></ProjectCard>
            ))
          }
        </div>
      </div>
    </>
  )
}

const HeroSection = () => {
  return (
    <>
      <div
        className={styles.HeroSection}
      >
        <h1>
          American Institute of Aeronautics and Astronautics at USF
        </h1>
        <h3>
          Become part of our vibrant community
        </h3>
        <button
          className={styles.CTAButton}
        >
          Join Now
        </button>
      </div>
    </>
  )
}

const AboutSection = () => {
  return (
    <>
      <div
        className={styles.AboutSection}
      >
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
    </>
  )
}

const Landing = () => {
  return (
    <>
      <div
        className={styles.Landing}
      >
        <HeroSection>
        </HeroSection>
        <AboutSection>
        </AboutSection>
        <ProjectSection>
        </ProjectSection>
        <EventSection>
        </EventSection>
        <MemberSection>
        </MemberSection>
      </div>
    </>
  )
}

export default Landing
