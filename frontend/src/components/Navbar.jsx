import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 h-16 bg-[rgba(4,6,15,0.75)] backdrop-blur-[16px] border-b border-[rgba(26,39,68,0.8)] relative navbar">
      <Link to="/" className="no-underline cursor-pointer">
        <h1 className="font-display text-[0.8rem] md:text-base font-black uppercase tracking-[0.15em] m-0 logo-text">
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
      </div>
    </nav>
  )
}

export default Navbar
