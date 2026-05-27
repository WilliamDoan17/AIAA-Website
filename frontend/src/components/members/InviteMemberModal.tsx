import { useState } from 'react'
import { useInviteMember } from '../../hooks/members'
import type { ClubRole } from '../../types/members'

type FieldErrors = Partial<Record<'email' | 'name' | 'title' | 'photo', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (form: { email: string; name: string; title: string; photo: string }): FieldErrors => {
  const errors: FieldErrors = {}
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  const name = form.name.trim()
  if (!name) {
    errors.name = 'Name is required'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (name.length > 64) {
    errors.name = 'Name must be 64 characters or fewer'
  }
  const title = form.title.trim()
  if (!title) {
    errors.title = 'Title is required'
  } else if (title.length < 2) {
    errors.title = 'Title must be at least 2 characters'
  } else if (title.length > 48) {
    errors.title = 'Title must be 48 characters or fewer'
  }
  if (form.photo.trim()) {
    try { new URL(form.photo.trim()) } catch { errors.photo = 'Enter a valid URL' }
  }
  return errors
}

type Props = { onClose: () => void }

const InviteMemberModal = ({ onClose }: Props) => {
  const [form, setForm] = useState({ email: '', name: '', role: 'officer' as ClubRole, title: '', photo: '', bio: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const { mutate: invite, isPending, error: inviteError } = useInviteMember()

  const setField = (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof FieldErrors]) {
      setFieldErrors(e => ({ ...e, [key]: undefined }))
    }
  }

  const handleSubmit = () => {
    const errors = validate(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    invite(form, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Invite Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        {([
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'photo', label: 'Photo URL', type: 'text' },
        ] as const).map(({ key, label, type }) => {
          const err = fieldErrors[key]
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
              <input
                type={type}
                value={form[key as keyof typeof form]}
                onChange={e => setField(key, e.target.value)}
                className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {err && <p className="text-red-400 text-xs font-body">{err}</p>}
            </div>
          )
        })}

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as ClubRole })}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {inviteError && <p className="text-red-400 text-xs font-body">Failed to send invite</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="relative overflow-hidden flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPending ? 'Sending...' : 'Send Invite'}
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

export default InviteMemberModal
