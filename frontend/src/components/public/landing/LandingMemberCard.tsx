import { Link } from 'react-router-dom'
import type { Member } from '../../../types/members'

type Props = { member: Member }

const LandingMemberCard = ({ member }: Props) => (
  <Link to={`/members/${member.id}`} className="bg-panel p-8 px-6 text-center relative overflow-hidden transition-[background] duration-300 hover:bg-surface block no-underline">
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
  </Link>
)

export default LandingMemberCard
