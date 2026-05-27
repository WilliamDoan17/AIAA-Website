import useProjects from '../../hooks/useProjects'
import { useEvents } from '../../hooks/events'
import { useMembers } from '../../hooks/members'
import { useClubInfo } from '../../hooks/club'
import LandingMemberCard from '../../components/public/landing/LandingMemberCard'
import LandingEventCard from '../../components/public/landing/LandingEventCard'
import LandingProjectCard from '../../components/public/landing/LandingProjectCard'

const Landing = () => {
  const { data: clubInfo } = useClubInfo()
  const { data: projects = [] } = useProjects()
  const { data: events = [] } = useEvents()
  const { data: members = [] } = useMembers()

  const now = new Date()
  const displayedEvents = [
    ...events.filter(e => new Date(e.start_time) <= now && new Date(e.end_time) >= now),
    ...events.filter(e => new Date(e.start_time) > now),
  ]

  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative starfield">

      {/* Hero */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center py-24 px-8 z-[1] overflow-hidden hero-glow hero-line">
        <h1 className="font-display text-[clamp(1.8rem,5vw,3.8rem)] font-black uppercase tracking-[0.06em] leading-[1.15] max-w-[900px] mb-6 heading-gradient fade-up-slow">
          {clubInfo?.name ?? ''}
        </h1>
        <h3 className="font-body font-light text-[clamp(1rem,2.5vw,1.4rem)] tracking-[0.25em] uppercase text-accent mb-10 fade-up-slow-d1">
          Become part of our vibrant community
        </h3>
        <button className="font-display text-sm font-bold uppercase tracking-[0.2em] py-4 px-12 bg-transparent text-accent border border-accent cursor-pointer relative overflow-hidden [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] transition-colors duration-300 cta-btn fade-up-slow-d2">
          Join Now
        </button>
      </div>

      {/* About */}
      {clubInfo && (
        <div className="relative z-[1] max-w-[860px] py-24 px-8 border-l-2 border-rim ml-[max(2rem,calc(50vw-430px))] mr-8">
          <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent block mb-8 uppercase">
            // ABOUT
          </span>
          <h1 className="font-display text-[clamp(1.3rem,3vw,2rem)] font-bold uppercase tracking-[0.05em] leading-[1.3] text-copy mb-8 pl-6">
            {clubInfo.name}
          </h1>
          <p className="text-[1.05rem] leading-[1.85] text-[#a0b0cc] font-light mb-6 pl-6">
            {clubInfo.about}
          </p>
        </div>
      )}

      {/* Projects */}
      <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
        <h1 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.4rem,3vw,2.2rem)] font-black text-copy section-underline">
          Our Projects
        </h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6">
          {projects.map(project => (
            <LandingProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
        <h2 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.2rem,2.5vw,1.9rem)] font-bold text-copy section-underline">
          Events
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {displayedEvents.map(event => (
            <LandingEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="relative z-[1] py-24 px-8 max-w-[1300px] mx-auto">
        <h2 className="font-display uppercase tracking-[0.08em] mb-12 text-[clamp(1.2rem,2.5vw,1.9rem)] font-bold text-copy section-underline">
          Our Team
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {members.map(member => (
            <LandingMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Landing
