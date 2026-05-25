import { useState, useMemo } from 'react'
import { useProjectMembers, useAddProjectMember, useUpdateProjectMember, useRemoveProjectMember } from '../../../hooks/projects/project-members'
import { useMembers } from '../../../hooks/members'
import type { Member } from '../../../types/members'
import type { ProjectMemberDetail, ProjectMemberRole, ProjectMemberUpdate } from '../../../types/projects/project-members'

interface ProjectMembersTabProps {
  projectId: string
  canManage: boolean
}

// ── Add Member Modal ──────────────────────────────────────────────────────────

interface AddMemberModalProps {
  projectId: string
  existingMemberIds: Set<string>
  onClose: () => void
}

type AddForm = { role: ProjectMemberRole; title: string }
type AddFieldErrors = Partial<Record<'member' | 'title', string>>

const AddMemberModal = ({ projectId, existingMemberIds, onClose }: AddMemberModalProps) => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Member | null>(null)
  const [form, setForm] = useState<AddForm>({ role: 'contributor', title: '' })
  const [fieldErrors, setFieldErrors] = useState<AddFieldErrors>({})
  const { data: allMembers = [] } = useMembers()
  const { mutate: add, isPending, error: addError } = useAddProjectMember()

  const candidates = useMemo(() => {
    const q = search.toLowerCase()
    return allMembers.filter(m => {
      if (existingMemberIds.has(m.id)) return false
      if (!q) return true
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    })
  }, [allMembers, existingMemberIds, search])

  const handleSubmit = () => {
    const errors: AddFieldErrors = {}
    if (!selected) errors.member = 'Select a member'
    if (!form.title.trim()) errors.title = 'Title is required'
    else if (form.title.trim().length < 2 || form.title.trim().length > 48) errors.title = 'Title must be 2–48 characters'
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    add(
      { project_id: projectId, member_id: selected!.id, role: form.role, title: form.title.trim() },
      { onSuccess: onClose }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Add Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        {/* Member search */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Member</label>

          {selected ? (
            /* Selected chip — replaces the input */
            <div className="flex items-center gap-3 bg-surface border border-accent rounded px-3 py-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full overflow-hidden bg-rim">
                {selected.photo
                  ? <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-rim" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-body text-sm font-medium text-copy">{selected.name}</span>
                <span className="font-body text-xs text-muted ml-2">{selected.email}</span>
              </div>
              <button
                onClick={() => { setSelected(null); setSearch('') }}
                className="text-muted hover:text-copy text-xs font-body transition-colors duration-200 flex-shrink-0 leading-none"
              >
                ✕
              </button>
            </div>
          ) : (
            /* Search input + dropdown overlay */
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => { setSearch(e.target.value); setFieldErrors(f => ({ ...f, member: undefined })) }}
                className={`w-full bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.member ? 'border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {search && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-panel border border-rim rounded shadow-lg overflow-hidden">
                  {candidates.length === 0 ? (
                    <p className="font-body text-xs text-muted px-4 py-3">No members found.</p>
                  ) : (
                    <div className="max-h-48 overflow-y-auto">
                      {candidates.map(m => (
                        <button
                          key={m.id}
                          onClick={() => { setSelected(m); setSearch(''); setFieldErrors(f => ({ ...f, member: undefined })) }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors duration-150 text-left"
                        >
                          <div className="w-7 h-7 flex-shrink-0 rounded-full overflow-hidden bg-rim">
                            {m.photo
                              ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full bg-rim" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm font-medium text-copy truncate">{m.name}</p>
                            <p className="font-body text-xs text-muted truncate">{m.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {fieldErrors.member && <p className="text-red-400 text-xs font-body">{fieldErrors.member}</p>}
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Project Title</label>
          <input
            type="text"
            placeholder="e.g. Lead Engineer"
            value={form.title}
            onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setFieldErrors(f => ({ ...f, title: undefined })) }}
            className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.title ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.title && <p className="text-red-400 text-xs font-body">{fieldErrors.title}</p>}
        </div>

        {/* Role */}
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

        {addError && <p className="text-red-400 text-xs font-body">Failed to add member</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Adding...' : 'Add Member'}
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

// ── Edit Member Modal ─────────────────────────────────────────────────────────

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

// ── Remove Confirm Modal ──────────────────────────────────────────────────────

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

// ── Main Tab ──────────────────────────────────────────────────────────────────

const ProjectMembersTab = ({ projectId, canManage }: ProjectMembersTabProps) => {
  const { data: members = [], isLoading } = useProjectMembers(projectId)
  const existingMemberIds = useMemo(() => new Set(members.map(m => m.member_id)), [members])
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<ProjectMemberDetail | null>(null)
  const [removing, setRemoving] = useState<ProjectMemberDetail | null>(null)

  if (isLoading) return <p className="text-muted font-body text-sm">Loading...</p>

  return (
    <>
      {canManage && adding && (
        <AddMemberModal projectId={projectId} existingMemberIds={existingMemberIds} onClose={() => setAdding(false)} />
      )}
      {canManage && editing && (
        <EditMemberModal projectId={projectId} member={editing} onClose={() => setEditing(null)} />
      )}
      {canManage && removing && (
        <RemoveMemberModal projectId={projectId} member={removing} onClose={() => setRemoving(null)} />
      )}

      <div className="flex flex-col gap-4">
        {canManage && (
          <div className="flex justify-end">
            <button
              onClick={() => setAdding(true)}
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
                      onClick={() => setEditing(member)}
                      className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setRemoving(member)}
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
