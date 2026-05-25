import { useRemoveProjectMember } from '../../../hooks/projects/project-members'
import type { ProjectMemberDetail } from '../../../types/projects/project-members'

interface RemoveMemberModalProps {
  projectId: string
  member: ProjectMemberDetail
  onClose: () => void
}

const RemoveMemberModal = ({ projectId, member, onClose }: RemoveMemberModalProps) => {
  const { mutate: remove, isPending, error: removeError } = useRemoveProjectMember()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Remove Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted">
          Remove <span className="text-copy font-medium">{member.member.name}</span> from this project?
        </p>

        {removeError && <p className="text-red-400 text-xs font-body">Failed to remove member</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => remove({ projectId, memberId: member.member_id }, { onSuccess: onClose })}
            disabled={isPending}
            className="flex-1 py-2.5 rounded border border-red-400 text-red-400 text-sm font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-400/10 transition-colors duration-200"
          >
            {isPending ? 'Removing...' : 'Remove'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveMemberModal
