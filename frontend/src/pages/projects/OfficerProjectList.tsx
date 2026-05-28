import useAuth from '../../hooks/useAuth'
import { useMemberProjects } from '../../hooks/projects/projects'
import OfficerProjectCard from '../../components/projects/OfficerProjectCard'

const OfficerProjectList = () => {
  const { member } = useAuth()
  const { data: projects = [], isLoading } = useMemberProjects(member!.id)

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-copy mb-8">
        My Projects
      </h1>

      {isLoading ? (
        <p className="font-body text-sm text-muted">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="font-body text-sm text-muted">You haven't been assigned to any projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map(project => (
            <OfficerProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OfficerProjectList
