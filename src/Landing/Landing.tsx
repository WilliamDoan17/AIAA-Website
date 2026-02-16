import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <nav
        className={styles.navigationBar}
      >
        <div
          className={styles.navigationBarLogoContainer}
        >
        </div>
        <div
          className={styles.navigationLinkContainer}
        >
          <Link to="/">Home</Link>
          <Link>Events</Link>
          <Link>Leadership Team</Link>
        </div>
      </nav>
    </>
  )
}

const HeroSection = () => {
  const backgroundImageLink = '';

  const heroSectionStyles = {
    backgroundImage: `url(${backgroundImageLink})`
  }
  return (
    <>
      <section
        className={styles.heroSection}
        style={heroSectionStyles}
      >
        <h1>
          American Institute of Aeronautics and Astronautics at USF
        </h1>
        <p>
          Become part of our vibrant community
        </p>
        <button
          className={styles.ctaButton}
        >
          Join Now
        </button>
      </section>
    </>
  )
}

const AboutSection = () => {
  return (
    <>
      <section
        className={styles.aboutSection}
      >
        <h1>
          Hi, we're the American Institute of Aeronautics and Astronautics!
        </h1>
        <p>
          Joining us means diving straight into real aerospace engineering challenges that you won't find in the classroom. Whether we’re creating a custom aircraft for the Student Unmanned Aerial Systems competition or building astronaut hardware that NASA will test in microgravity, every project challenges us to think creatively and work as a team. Along the way, you’ll gain hands-on technical skills, connect with industry professionals, and become part of a community who shares your passion for flight and space. It’s exciting, rewarding, and an experience that will stay with you far beyond graduation."
        </p>
        <p>
          We currently has 2 major projects. SUAS an autonamous long range drone for hurricane recovery and COSMIC a satelite robotic arm for in space manufacturing to be presented to NASA in April.
        </p>
        <p>
          We are a newer club, only about a year old, so every member is assigned tasks and everything is very hands on. Great time to join cause this semester will be a large push for manufacturing!
        </p>
      </section>
    </>
  )
}

const EventCard = ({ event }) => {
  return (
    <>
      <div
        classname = {styles.eventcard}
      >
        <img>
        </img>
        <div
          classname = {styles.eventinfo}
        >
          <p>
            {event.date} | {event.time}
          </p>
          <h2>
            {event.name}
          </h2>
        </div>
      </div>
    </>
  ) 
}

const EventContainer = () => {
  const events = [
    {
      date: 'Feb 5',
      time: '6:00pm - 7:00pm',
      name: 'COSMIC Sattelite Competition'
    },
    {
      date: 'Feb 12',
      time: '6:00pm - 7:00pm',
      name: 'COSMIC Sattelite Competition'
    },
    {
      date: 'Feb 19 | 6:00pm - 7:00pm',
      time: '6:00pm - 7:00pm',
      name: 'COSMIC Sattelite Competition',
    }
  ];

  return (
    <>
      <div
        classname = {styles.eventcontainer}
      >
        {
          events.map(event => (
            <EventCard
              key = {event}
              event = {event}
            >
            </EventCard>
          ))
        }
      </div>
    </> 
  )
}

const UpcomingEvents = () => {
  return (
    <>
      <section
        className = {styles.upcomingEvents}
      >
        <h1>
          Upcoming Events
        </h1>            
        <EventContainer>
        </EventContainer> 
      </section>
    </>
  )
}

const BoardMemberCard = ({ member }) => {
  return (
    <>
      <div
        className = {styles.boardMemberCard}
      >
        <img>
        </img>
        <strong>
          {member.name}
        </strong>
        <p>
          {member.role}
        </p>
      </div>
    </>
  )
}

const BoardContainer = () => {
  const boardMembers = [
    {
      name: 'Ethan Dewild',
      role: 'President',
    },
    {
      name: 'Christopher Lemonds',
      role: 'Vice-President',
    },
    {
      name: 'Ryan Hillock',
      role: 'Officer',
    },
    {
      name: 'Torin Hulshof',
      role: 'Secretary',
    },
    {
      name: 'Ethan Walsh',
      role: 'Officer',
    },
    {
      name: 'Catalina Montijo-Vindas',
      role: 'Officer',
    }
  ]

  return (
    <>
      <div
        className = {styles.boardContainer}
      >
        {
          boardMembers.map(member => (
            <BoardMemberCard
              member = {member}
              key = {member}
            ></BoardMemberCard>
          ))
        }
      </div>
    </>
  )
}

const BoardSection = () => {
  return (
    <>
      <section
        className = {styles.boardSection}
      >
        <h1>
          Meet Our Board
        </h1>
        <BoardContainer>
        </BoardContainer>
      </section>
    </>
  )
}

const SocialCard = ({ social }) => {
  return (
    <>
      <div
        className = {styles.socialCard}
      >
        <img>
        </img>
      </div>
    </>
  ) 
}

const SocialContainer = () => {
  const socials = [];
  
  return (
    <>
      {
        socials.map(social => (
          <SocialCard
            key = {social}
            social = {social}
          >
          </SocialCard>
        ))
      }
    </>
  )
}

const SocialSection = () => {
  return (
    <>
      <section
        className = {styles.socialSection}
      >
        <h1>
          Our Socials
        </h1>
        
      </section>
    </>
  )
}

const Landing = () => {

  return (
    <>
      <div
        className={styles.landingContainer}
      >
        <NavigationBar>
        </NavigationBar>
        <HeroSection>
        </HeroSection>
        <AboutSection>'
        </AboutSection>
        <UpcomingEvents>
        </UpcomingEvents>
        <BoardSection>
        </BoardSection>
        <SocialSection>
        </SocialSection>
      </div>
    </>
  )
}

export default Landing;
