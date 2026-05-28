import type { Member } from '../../types/members'

type Props = {
  member: Member
  onEdit: () => void
  onRemove: () => void
  removing?: boolean
}

const AdminMemberCard = ({ member, onEdit, onRemove, removing = false }: Props) => (
  <div className="flex items-center gap-4 bg-surface border border-rim rounded-xl px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40">
    <div className="w-9 h-9 rounded-full overflow-hidden border border-rim flex-shrink-0">
      {member.photo
        ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        : <div className="w-full h-full bg-rim" />
      }
    </div>

    <div className="flex-1 min-w-0">
      <p className="font-body text-sm font-medium text-copy truncate">{member.name}</p>
      <p className="font-body text-xs text-muted truncate">{member.email}</p>
    </div>

    <span className="font-display text-[0.6rem] uppercase tracking-widest text-muted hidden sm:block">
      {member.title}
    </span>

    <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded-xl border ${
      member.role === 'admin' ? 'text-accent border-accent/30 bg-accent-dim' : 'text-muted border-rim'
    }`}>
      {member.role}
    </span>

    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={onEdit}
        className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
      >
        Edit
      </button>
      <button
        onClick={onRemove}
        disabled={removing}
        className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1 disabled:opacity-50"
      >
        {removing ? '...' : 'Remove'}
      </button>
    </div>
  </div>
)

export default AdminMemberCard
