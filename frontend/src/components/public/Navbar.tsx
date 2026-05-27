import { Link, NavLink } from 'react-router-dom'
import LoginButton from './LoginButton'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 h-16 bg-panel/80 backdrop-blur-[16px] border-b border-rim">
      <Link to="/" className="no-underline cursor-pointer">
        <h1 className="font-display text-[0.8rem] md:text-base font-semibold uppercase tracking-wide m-0 text-copy hover:text-accent transition-colors duration-200">
          AIAA at USF
        </h1>
      </Link>
      <div className="flex items-center gap-6 md:gap-10">
        {['projects', 'events', 'members'].map(route => (
          <NavLink
            key={route}
            to={`/${route}`}
            className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] no-underline relative pb-1 nav-link"
          >
            {route.charAt(0).toUpperCase() + route.slice(1)}
          </NavLink>
        ))}
        <LoginButton>
        </LoginButton>
      </div>
    </nav>
  )
}

export default Navbar
