import type { Project } from '../../../types/projects/projects'
import ProjectInfoForm from './ProjectInfoForm'

interface ProjectInfoTabProps {
  project: Project
}

const ProjectInfoTab = ({ project }: ProjectInfoTabProps) => {
  return <ProjectInfoForm project={project} />
}

export default ProjectInfoTab
