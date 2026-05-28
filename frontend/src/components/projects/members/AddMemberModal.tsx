import { useState, useMemo } from 'react'
import { useAddProjectMember } from '../../../hooks/projects/project-members'
import { useMembers } from '../../../hooks/members'
import type { Member } from '../../../types/members'
import type { ProjectMemberRole } from '../../../types/projects/project-members'

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
      <div className="bg-panel border border-rim rounded-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Add Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Member</label>
          {selected ? (
            <div className="flex items-center gap-3 bg-surface border border-accent rounded-xl px-3 py-2">
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => { setSearch(e.target.value); setFieldErrors(f => ({ ...f, member: undefined })) }}
                className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.member ? 'border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {search && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-panel border border-rim rounded-xl shadow-lg overflow-hidden">
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

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Project Title</label>
          <input
            type="text"
            placeholder="e.g. Lead Engineer"
            value={form.title}
            onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setFieldErrors(f => ({ ...f, title: undefined })) }}
            className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${fieldErrors.title ? 'border-red-400' : 'border-rim focus:border-accent'}`}
          />
          {fieldErrors.title && <p className="text-red-400 text-xs font-body">{fieldErrors.title}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Role</label>
          <select
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value as ProjectMemberRole }))}
            className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
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
            className="flex-1 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Adding...' : 'Add Member'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddMemberModal
