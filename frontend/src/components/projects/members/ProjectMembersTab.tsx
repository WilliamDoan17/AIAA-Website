import { useState, useMemo } from 'react'
import { useProjectMembers } from '../../../hooks/projects/project-members'
import type { ProjectMemberDetail } from '../../../types/projects/project-members'
import AddMemberModal from './AddMemberModal'
import EditMemberModal from './EditMemberModal'
import RemoveMemberModal from './RemoveMemberModal'

interface ProjectMembersTabProps {
  projectId: string
  canManage: boolean
}

type ModalState =
  | { type: 'add' }
  | { type: 'edit'; member: ProjectMemberDetail }
  | { type: 'remove'; member: ProjectMemberDetail }
  | null

const ProjectMembersTab = ({ projectId, canManage }: ProjectMembersTabProps) => {
  const { data: members = [], isLoading } = useProjectMembers(projectId)
  const existingMemberIds = useMemo(() => new Set(members.map(m => m.member_id)), [members])
  const [modal, setModal] = useState<ModalState>(null)

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  return (
    <>
      {canManage && modal?.type === 'add' && (
        <AddMemberModal projectId={projectId} existingMemberIds={existingMemberIds} onClose={() => setModal(null)} />
      )}
      {canManage && modal?.type === 'edit' && (
        <EditMemberModal projectId={projectId} member={modal.member} onClose={() => setModal(null)} />
      )}
      {canManage && modal?.type === 'remove' && (
        <RemoveMemberModal projectId={projectId} member={modal.member} onClose={() => setModal(null)} />
      )}

      <div className="flex flex-col gap-4">
        {canManage && (
          <div className="flex justify-end">
            <button
              onClick={() => setModal({ type: 'add' })}
              className="px-4 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
            >
              + Add Member
            </button>
          </div>
        )}

        {members.length === 0 ? (
          <p className="text-muted font-body text-sm">No members yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {members.map(member => (
              <div
                key={member.member_id}
                className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4"
              >
                <div className="w-9 h-9 flex-shrink-0 overflow-hidden rounded-full bg-rim">
                  {member.member.photo
                    ? <img src={member.member.photo} alt={member.member.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-rim" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-copy truncate">{member.member.name}</p>
                  <p className="font-body text-xs text-muted truncate">{member.title}</p>
                </div>
                <span className="font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 text-muted border-rim">
                  {member.role}
                </span>
                {canManage && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setModal({ type: 'edit', member })}
                      className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setModal({ type: 'remove', member })}
                      className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectMembersTab
