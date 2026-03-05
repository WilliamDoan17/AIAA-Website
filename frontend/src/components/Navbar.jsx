import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
const Navbar = () => {
  return (
    <>
      <nav
        className={styles.Navbar}
      >
        <div
          className={styles.logo}
        >
          <Link
            to="/"
          >
            <h1>
              AIAA at USF
            </h1>

          </Link>
        </div>
        <div
          className={styles.linkContainer}
        >
          <Link
            to="/projects"
          >
            Projects
          </Link>
          <Link
            to="/events"
          >
            Events
          </Link>
          <Link
            to="/members"
          >
            Members
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
