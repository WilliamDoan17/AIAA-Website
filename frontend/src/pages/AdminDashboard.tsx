import { Link } from 'react-router-dom'
import { useMembers } from '../hooks/members'
import { useProjects } from '../hooks/projects/projects'
import { useEvents } from '../hooks/events'
import AdminStatCard from '../components/admin/AdminStatCard'
import DashboardEventCard from '../components/officer/DashboardEventCard'

const AdminDashboard = () => {
  const { data: members = [], isLoading: membersLoading } = useMembers()
  const { data: projects = [], isLoading: projectsLoading } = useProjects()
  const { data: events = [], isLoading: eventsLoading } = useEvents()

  const now = new Date()
  const upcomingEvents = events
    .filter(e => new Date(e.start_time) > now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 3)

  const activeProjects = projects.filter(p => p.status === 'in_progress').length

  return (
    <div className="max-w-3xl flex flex-col gap-12">

      <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
        Dashboard
      </h1>

      {/* Stats */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xs uppercase tracking-widest text-muted">Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AdminStatCard label="Members" value={membersLoading ? '—' : members.length} />
          <AdminStatCard label="Projects" value={projectsLoading ? '—' : projects.length} />
          <AdminStatCard label="Active" value={projectsLoading ? '—' : activeProjects} />
          <AdminStatCard label="Events" value={eventsLoading ? '—' : events.length} />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xs uppercase tracking-widest text-muted">Upcoming Events</h2>
        {eventsLoading ? (
          <p className="font-body text-sm text-muted">Loading...</p>
        ) : upcomingEvents.length === 0 ? (
          <p className="font-body text-sm text-muted">No upcoming events.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcomingEvents.map(event => (
              <DashboardEventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xs uppercase tracking-widest text-muted">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/u/admin/members" className="px-5 py-2 rounded-xl border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200">
            Members
          </Link>
          <Link to="/u/admin/projects" className="px-5 py-2 rounded-xl border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200">
            Projects
          </Link>
          <Link to="/u/admin/events" className="px-5 py-2 rounded-xl border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200">
            Events
          </Link>
          <Link to="/u/admin/club" className="px-5 py-2 rounded-xl border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200">
            Club Info
          </Link>
        </div>
      </section>

    </div>
  )
}

export default AdminDashboard
