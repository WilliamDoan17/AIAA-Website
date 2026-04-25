import useProjects from "../hooks/useProjects"
import useEvents from '../hooks/useEvents'
import useMembers from "../hooks/useMembers"
import type { Member } from '../types/member'
import type { Event } from '../types/event'
import type { Project } from '../types/project'

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="bg-panel p-8 px-6 text-center relative overflow-hidden transition-[background] duration-300 hover:bg-surface fade-up member-glow">
      <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-rim mx-auto mb-4 transition-[border-color] duration-300 relative z-[1] hover:border-accent">
        {member.photo
          ? <img className="w-full h-full object-cover [filter:grayscale(30%)] transition-[filter] duration-300 hover:[filter:grayscale(0%)]" src={member.photo} alt={member.name} />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <h3 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.1em] text-copy m-0 mb-1.5 relative z-[1]">
        {member.name}
      </h3>
      <p className="text-[0.8rem] text-accent m-0 tracking-[0.08em] uppercase font-normal relative z-[1]">
        {member.title}
      </p>
    </div>
  )
}

const MemberSection = () => {
  const { data = [] } = useMembers()
  return (
    <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
      <h2 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.2rem,2.5vw,1.9rem)] font-bold text-copy section-underline">
        Our Team
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {data.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

const EventCard = ({ event }: { event: Event }) => {
  const start = new Date(event.start_time)
  const end = new Date(event.end_time)
  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="bg-panel border border-rim overflow-hidden relative transition-[border-color,box-shadow] duration-300 hover:border-gold hover:shadow-[0_0_30px_rgba(240,165,0,0.1)] fade-up group">
      <div className="w-full aspect-video overflow-hidden">
        {event.cover_image
          ? <img className="w-full h-full object-cover block [filter:brightness(0.7)_saturate(0.6)] transition-[filter] duration-300 group-hover:[filter:brightness(0.85)_saturate(0.9)]" src={event.cover_image} alt={event.name} />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <h4 className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold mx-6 mt-5 mb-1">
        {date} | {startTime} - {endTime}
      </h4>
      <h4 className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted mx-6 mb-0">
        {event.location}
      </h4>
      <h3 className="font-display text-[0.95rem] font-bold uppercase tracking-[0.06em] text-copy mx-6 my-3">
        {event.name}
      </h3>
      <p className="text-[0.9rem] leading-[1.65] text-muted mx-6 mb-6 font-light">
        {event.description}
      </p>
    </div>
  )
}

const EventSection = () => {
  const { data = [] } = useEvents()
  const now = new Date()
  const displayed = [
    ...data.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now),
    ...data.filter(e => new Date(e.start_time) > now)
  ]
  return (
    <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
      <h2 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.2rem,2.5vw,1.9rem)] font-bold text-copy section-underline">
        Events
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {displayed.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
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
}

const ProjectSection = () => {
  const { data: projects = [] } = useProjects()
  return (
    <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
      <h1 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.4rem,3vw,2.2rem)] font-black text-copy section-underline">
        Our Projects
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center py-24 px-8 z-[1] overflow-hidden hero-glow hero-line">
      <h1 className="font-display text-[clamp(1.8rem,5vw,3.8rem)] font-black uppercase tracking-[0.06em] leading-[1.15] max-w-[900px] mb-6 heading-gradient fade-up-slow">
        American Institute of Aeronautics and Astronautics at USF
      </h1>
      <h3 className="font-body font-light text-[clamp(1rem,2.5vw,1.4rem)] tracking-[0.25em] uppercase text-accent mb-10 fade-up-slow-d1">
        Become part of our vibrant community
      </h3>
      <button className="font-display text-sm font-bold uppercase tracking-[0.2em] py-4 px-12 bg-transparent text-accent border border-accent cursor-pointer relative overflow-hidden [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] transition-colors duration-300 cta-btn fade-up-slow-d2">
        Join Now
      </button>
    </div>
  )
}

const AboutSection = () => {
  return (
    <div className="relative z-[1] max-w-[860px] py-24 px-8 border-l-2 border-rim ml-[max(2rem,calc(50vw-430px))] mr-8">
      <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent block mb-8 uppercase">
        // ABOUT
      </span>
      <h1 className="font-display text-[clamp(1.3rem,3vw,2rem)] font-bold uppercase tracking-[0.05em] leading-[1.3] text-copy mb-8 pl-6">
        Hi, we're the American Institute of Aeronautics and Astronautics!
      </h1>
      <p className="text-[1.05rem] leading-[1.85] text-[#a0b0cc] font-light mb-6 pl-6">
        Joining us means diving straight into real aerospace engineering challenges that you won't find in the classroom. Whether we're creating a custom aircraft for the Student Unmanned Aerial Systems competition or building astronaut hardware that NASA will test in microgravity, every project challenges us to think creatively and work as a team. Along the way, you'll gain hands-on technical skills, connect with industry professionals, and become part of a community who shares your passion for flight and space. It's exciting, rewarding, and an experience that will stay with you far beyond graduation.
      </p>
      <p className="text-[1.05rem] leading-[1.85] text-[#a0b0cc] font-light mb-6 pl-6">
        We currently have 2 major projects. SUAS an autonomous long range drone for hurricane recovery and COSMIC a satellite robotic arm for in space manufacturing to be presented to NASA in April.
      </p>
      <p className="text-[1.05rem] leading-[1.85] text-[#a0b0cc] font-light mb-6 pl-6">
        We are a newer club, only about a year old, so every member is assigned tasks and everything is very hands on. Great time to join because this semester will be a large push for manufacturing!
      </p>
    </div>
  )
}

const Landing = () => {
  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative starfield">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <EventSection />
      <MemberSection />
    </div>
  )
}

export default Landing
