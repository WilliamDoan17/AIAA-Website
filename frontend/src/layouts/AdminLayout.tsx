import { NavLink, Outlet } from "react-router-dom"
import { logout } from "../services/auth"

const navItems = [
  { label: 'Club', to: '/u/admin/club' },
  { label: 'Members', to: '/u/admin/members' },
  { label: 'Projects', to: '/u/admin/projects' },
  { label: 'Events', to: '/u/admin/events' },
]

const AdminSidebar = () => {
  return (
    <aside className="w-56 shrink-0 bg-panel border-r border-rim flex flex-col">
      <div className="px-6 py-5 border-b border-rim">
        <span className="font-display text-sm font-semibold tracking-widest text-accent uppercase">
          Admin
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm font-body transition-colors duration-200 ${isActive
                ? 'bg-accent-dim text-accent'
                : 'text-muted hover:text-copy hover:bg-rim'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-rim">
        <button
          onClick={logout}
          className="w-full px-3 py-2 rounded text-sm font-body text-muted hover:text-copy hover:bg-rim transition-colors duration-200 text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-void text-copy flex starfield">
      <AdminSidebar />
      <main className="flex-1 overflow-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
