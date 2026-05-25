import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import type { ProjectMemberDetail } from '../../../types/projects/project-members'

interface ProjectMemberCardProps {
  member: ProjectMemberDetail
  canManage?: boolean
  onEdit?: () => void
  onRemove?: () => void
}

const ProjectMemberCard = ({ member, canManage = false, onEdit, onRemove }: ProjectMemberCardProps) => {
  const { member: authMember } = useAuth()
  const memberBase = authMember?.role === 'admin' ? '/u/admin/member' : '/u/officer/member'

  return (
    <div className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4">
      <Link
        to={`${memberBase}/${member.member.id}`}
        className="w-9 h-9 flex-shrink-0 overflow-hidden rounded-full bg-rim hover:opacity-80 transition-opacity duration-200"
      >
        {member.member.photo
          ? <img src={member.member.photo} alt={member.member.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-rim" />
        }
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to={`${memberBase}/${member.member.id}`}
          className="font-body text-sm font-medium text-copy hover:text-accent transition-colors duration-200 truncate block"
        >
          {member.member.name}
        </Link>
        <p className="font-body text-xs text-muted truncate">{member.title}</p>
      </div>

      <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 text-muted border-rim">
        {member.role}
      </span>

      {canManage && (
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onEdit}
            className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
          >
            Edit
          </button>
          <button
            onClick={onRemove}
            className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectMemberCard
