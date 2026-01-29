import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  const NavigationBar = () => {
    return (
      <>
        <nav
          className = {styles.navigationBar}
        >
          <div
            className = {styles.navigationBarLogoContainer}
          >
          </div>
          <div
            className = {styles.navigationLinkContainer}
          >
            <Link to = "/">Home</Link>
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
          className = {styles.heroSection}
          style = {heroSectionStyles}
        >
          <h1>
            American Institute of Aeronautics and Astronautics at USF
          </h1>
          <p>
            Become part of our vibrant community
          </p>
          <button
            className = {styles.ctaButton}
          >
          </button>
        </section>
      </>
    )
  }

  return (
    <>
      <div
        className = {styles.landingContainer}
      >
        <NavigationBar>
        </NavigationBar>
        <HeroSection>
        </HeroSection>
      </div>
    </>
  )
}

export default Landing;
