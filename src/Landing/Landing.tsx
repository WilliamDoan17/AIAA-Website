import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
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

  const UpcomingEvents = () => {
    const EventContainer = () => {
      const events = [
        {
          date: 'Feb 5',
          time: '6:00pm - 7:00pm',
          name: 'COSMIC Sattelite Competition'
        },
      ];
      return (
        <>
        </> 
      )
    }

    return (
      <>
        <section
          className = {styles.UpcomingEvents}
        >
                
        </section>
      </>
    )
  }

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
      </div>
    </>
  )
}

export default Landing;
