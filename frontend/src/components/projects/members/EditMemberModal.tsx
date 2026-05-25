import { useState } from 'react'
import { useUpdateProjectMember } from '../../../hooks/projects/project-members'
import type { ProjectMemberDetail, ProjectMemberRole, ProjectMemberUpdate } from '../../../types/projects/project-members'

interface EditMemberModalProps {
  projectId: string
  member: ProjectMemberDetail
  onClose: () => void
}

const EditMemberModal = ({ projectId, member, onClose }: EditMemberModalProps) => {
  const [form, setForm] = useState<ProjectMemberUpdate>({ role: member.role, title: member.title })
  const [titleError, setTitleError] = useState<string>()
  const { mutate: update, isPending, error: updateError } = useUpdateProjectMember()

  const handleSubmit = () => {
    if (!form.title?.trim()) { setTitleError('Title is required'); return }
    if (form.title.trim().length < 2 || form.title.trim().length > 48) { setTitleError('Title must be 2–48 characters'); return }
    update(
      { projectId, memberId: member.member_id, updates: { ...form, title: form.title.trim() } },
      { onSuccess: onClose }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Edit Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-copy font-medium">{member.member.name}</p>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Project Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setTitleError(undefined) }}
            className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none transition-colors duration-200 ${titleError ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {titleError && <p className="text-red-400 text-xs font-body">{titleError}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Role</label>
          <select
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value as ProjectMemberRole }))}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="contributor">Contributor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {updateError && <p className="text-red-400 text-xs font-body">Failed to update member</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
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

export default EditMemberModal
