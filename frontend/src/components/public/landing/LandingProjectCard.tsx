import type { Project } from '../../../types/projects'

type Props = { project: Project }

const LandingProjectCard = ({ project }: Props) => (
  <div className="bg-panel border border-rim flex flex-col overflow-hidden relative transition-[border-color,transform] duration-300 cursor-default card-accent hover:border-accent hover:-translate-y-1 fade-up group">
    <div className="w-full aspect-video overflow-hidden">
      {project.cover_image
        ? <img className="w-full h-full object-cover block [filter:brightness(0.75)_saturate(0.8)] transition-[filter] duration-300 group-hover:[filter:brightness(0.9)_saturate(1)]" src={project.cover_image} alt={project.name} />
        : <div className="w-full h-full bg-rim" />
      }
    </div>
    <div className="p-6 pr-7 pb-8">
      <h3 className="font-display text-base font-bold uppercase tracking-[0.08em] text-copy m-0 mb-3">
        {project.name}
      </h3>
      <p className="text-[0.95rem] leading-[1.7] text-muted m-0 font-light">
        {project.summary}
      </p>
    </div>
  </div>
)

export default LandingProjectCard
