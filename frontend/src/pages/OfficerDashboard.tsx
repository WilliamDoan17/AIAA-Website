import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useMemberProjects } from '../hooks/projects/projects'
import { useEvents } from '../hooks/events'
import OfficerProjectCard from '../components/projects/OfficerProjectCard'
import DashboardEventCard from '../components/officer/DashboardEventCard'

const OfficerDashboard = () => {
  const { member } = useAuth()
  const { data: projects = [], isLoading: projectsLoading } = useMemberProjects(member!.id)
  const { data: events = [], isLoading: eventsLoading } = useEvents()

  const now = new Date()
  const upcomingEvents = events
    .filter(e => new Date(e.start_time) > now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 3)

  const displayedProjects = projects.slice(0, 4)

  return (
    <div className="max-w-3xl flex flex-col gap-12">

      <div>
        <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline mb-1">
          Welcome back, {member?.name?.split(' ')[0]}
        </h1>
      </div>

      {/* My Projects */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xs uppercase tracking-widest text-muted">My Projects</h2>
          {projects.length > 4 && (
            <Link
              to="/u/officer/projects"
              className="font-display text-[0.65rem] uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200"
            >
              View all →
            </Link>
          )}
        </div>
        {projectsLoading ? (
          <p className="font-body text-sm text-muted">Loading...</p>
        ) : displayedProjects.length === 0 ? (
          <p className="font-body text-sm text-muted">You haven't been assigned to any projects yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedProjects.map(project => (
              <OfficerProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
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
        <div className="flex gap-3">
          <Link
            to="/u/officer/projects"
            className="px-5 py-2 rounded border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200"
          >
            All Projects
          </Link>
          <Link
            to="/u/profile"
            className="px-5 py-2 rounded border border-rim text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-copy hover:border-muted transition-colors duration-200"
          >
            Edit Profile
          </Link>
        </div>
      </section>

    </div>
  )
}

export default OfficerDashboard
