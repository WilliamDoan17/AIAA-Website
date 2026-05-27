import { useMembers } from '../../hooks/members'
import PresidentCard from '../../components/members/PresidentCard'
import PublicMemberContainer from '../../components/members/PublicMemberContainer'

const PublicMemberList = () => {
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
      <PublicMemberContainer members={crews} />
    </div>
  )
}

export default PublicMemberList
