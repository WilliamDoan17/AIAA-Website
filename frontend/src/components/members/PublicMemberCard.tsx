import { Link } from 'react-router-dom'
import type { Member } from '../../types/members'

type Props = { member: Member }

const PublicMemberCard = ({ member }: Props) => (
  <Link to={`/members/${member.id}`} className="bg-panel border border-rim p-10 px-8 relative overflow-hidden text-center transition-[background,border-color] duration-300 hover:bg-surface hover:border-accent fade-up member-glow block no-underline">
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
  </Link>
)

export default PublicMemberCard
