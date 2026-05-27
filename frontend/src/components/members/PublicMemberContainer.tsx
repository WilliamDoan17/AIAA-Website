import type { Member } from '../../types/members'
import PublicMemberCard from './PublicMemberCard'

type Props = { members: Member[] }

const PublicMemberContainer = ({ members }: Props) => {
  if (members.length === 0) return null
  return (
    <div className="relative z-[1] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 max-w-[1300px] mx-auto mt-12 px-6 md:px-16">
      {members.map(member => (
        <PublicMemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}

export default PublicMemberContainer
