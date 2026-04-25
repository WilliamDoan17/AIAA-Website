import useMembers from '../hooks/useMembers'
import type { Member } from '../types/member'

const PresidentCard = ({ president }: { president: Member }) => {
  return (
    <div className="relative z-[1] flex flex-col md:flex-row items-stretch max-w-[1300px] mx-auto mt-12 px-6 md:px-16 gap-6 md:gap-12 fade-up president-bar group">
      <div className="relative w-full md:w-80 aspect-[3/4] flex-shrink-0 overflow-hidden border border-[rgba(240,165,0,0.3)] md:ml-4">
        {president.photo
          ? <img className="w-full h-full object-cover block [filter:brightness(0.85)_saturate(0.7)] transition-[filter] duration-300 group-hover:[filter:brightness(1)_saturate(1)]" src={president.photo} alt={president.name} />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <div className="flex flex-col justify-start pt-0 md:pt-4 pb-4">
        <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy mb-3 leading-[1.1]">
          {president.name}
        </h3>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold m-0">
          PRESIDENT
        </p>
      </div>
    </div>
  )
}

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="bg-panel border border-rim p-10 px-8 relative overflow-hidden text-center transition-[background,border-color] duration-300 hover:bg-surface hover:border-accent fade-up member-glow">
      <div className="w-20 h-20 rounded-full overflow-hidden border border-rim mx-auto mb-5 transition-[border-color] duration-300 relative z-[1] group-hover:border-accent">
        {member.photo
          ? <img className="w-full h-full object-cover [filter:grayscale(40%)] transition-[filter] duration-300 hover:[filter:grayscale(0%)]" src={member.photo} alt={member.name} />
          : <div className="w-full h-full bg-rim" />
        }
      </div>
      <h3 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-copy mb-1.5 relative z-[1]">
        {member.name}
      </h3>
      <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent m-0 relative z-[1]">
        {member.title.toUpperCase()}
      </p>
    </div>
  )
}

const MemberContainer = ({ members }: { members: Member[] }) => {
  if (members.length === 0) return null
  return (
    <div className="relative z-[1] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 max-w-[1300px] mx-auto mt-12 px-6 md:px-16">
      {members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}

const Members = () => {
  const { data = [] } = useMembers()
  const president = data.find(member => member.title === 'President')
  const crews = data.filter(member => member.title !== 'President')

  return (
    <div className="bg-void text-copy font-body min-h-screen overflow-x-hidden relative pb-24 starfield">
      <h1 className="relative z-[1] font-display font-black uppercase tracking-[0.06em] pt-20 pb-8 px-6 md:px-16 max-w-[1300px] mx-auto border-b border-rim heading-gradient fade-up-slow text-[clamp(2rem,5vw,3.5rem)]">
        <span className="font-display text-[0.7rem] tracking-[0.3em] text-accent block mb-4 [background:none] [-webkit-text-fill-color:var(--color-accent)]">
          // CREW
        </span>
        Members
      </h1>
      {president && <PresidentCard president={president} />}
      <MemberContainer members={crews} />
    </div>
  )
}

export default Members
