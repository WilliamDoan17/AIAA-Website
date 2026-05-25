import { useState, useMemo } from 'react'
import { useProjectMembers } from '../../../hooks/projects/project-members'
import type { ProjectMemberDetail } from '../../../types/projects/project-members'
import AddMemberModal from './AddMemberModal'
import EditMemberModal from './EditMemberModal'
import RemoveMemberModal from './RemoveMemberModal'
import ProjectMemberCard from './ProjectMemberCard'

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
              <ProjectMemberCard
                key={member.member_id}
                member={member}
                canManage={canManage}
                onEdit={() => setModal({ type: 'edit', member })}
                onRemove={() => setModal({ type: 'remove', member })}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectMembersTab
