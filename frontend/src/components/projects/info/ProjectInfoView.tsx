import type { Project } from '../../../types/projects/projects'

interface ProjectInfoViewProps {
  project: Project
}

const ProjectInfoView = ({ project }: ProjectInfoViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      {project.cover_image && (
        <div className="w-full aspect-video overflow-hidden border border-rim">
          <img src={project.cover_image} alt={project.name} className="w-full h-full object-cover [filter:brightness(0.8)_saturate(0.7)]" />
        </div>
      )}
      <p className="font-body text-sm text-muted leading-relaxed">{project.summary}</p>
      {project.description && (
        <p className="font-body text-sm text-muted leading-relaxed border-t border-rim pt-6 whitespace-pre-wrap">
          {project.description}
        </p>
      )}
    </div>
  )
}

export default ProjectInfoView
