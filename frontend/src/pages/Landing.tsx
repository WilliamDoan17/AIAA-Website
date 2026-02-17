import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import styles from './Landing.module.css'

const HeroSection = () => {
  return (
    <>
      <div
        className={styles.HeroSection}
      >
        <h1>
          American Institute of Aeronautics and Astronauts at USF
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

const Landing = () => {
  return (
    <>
      <div
        className={styles.Landing}
      >
        <Navbar>
        </Navbar>
        <HeroSection>
        </HeroSection>
        <Footer>
        </Footer>
      </div>
    </>
  )
}

export default Landing
