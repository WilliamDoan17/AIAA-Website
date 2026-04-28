import { useState, useEffect, useMemo } from 'react'
import { getAllMembers, inviteMember, updateMember, deleteMember } from '../services/members'
import type { Member } from '../types/member'
import type { ClubRole } from '../types/member'

// ── Invite Modal ──────────────────────────────────────────────────────────────

type InviteFieldErrors = Partial<Record<'email' | 'name' | 'title' | 'photo', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateInviteForm = (form: { email: string; name: string; title: string; photo: string }): InviteFieldErrors => {
  const errors: InviteFieldErrors = {}

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

interface InviteModalProps {
  onClose: () => void
  onInvited: () => void
}

const InviteModal = ({ onClose, onInvited }: InviteModalProps) => {
  const [form, setForm] = useState({ email: '', name: '', role: 'officer' as ClubRole, title: '', photo: '', bio: '' })
  const [fieldErrors, setFieldErrors] = useState<InviteFieldErrors>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setField = (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof InviteFieldErrors]) {
      setFieldErrors(e => ({ ...e, [key]: undefined }))
    }
  }

  const handleSubmit = async () => {
    const errors = validateInviteForm(form)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setSaving(true)
    setError(null)
    try {
      await inviteMember(form)
      onInvited()
      onClose()
    } catch {
      setError('Failed to send invite')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
            Invite Member
          </h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        {[
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'photo', label: 'Photo URL', type: 'text' },
        ].map(({ key, label, type }) => {
          const err = fieldErrors[key as keyof InviteFieldErrors]
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

        {error && <p className="text-red-400 text-xs font-body">{error}</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="relative overflow-hidden flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? 'Sending...' : 'Send Invite'}
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

// ── Edit Modal ────────────────────────────────────────────────────────────────

interface EditModalProps {
  member: Member
  onClose: () => void
  onSaved: () => void
}

const EditModal = ({ member, onClose, onSaved }: EditModalProps) => {
  const [form, setForm] = useState({ role: member.role, title: member.title })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      await updateMember(member.id, form)
      onSaved()
      onClose()
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
            Edit Member
          </h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted -mt-2">{member.name}</p>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

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

        {error && <p className="text-red-400 text-xs font-body">{error}</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="relative overflow-hidden flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? 'Saving...' : 'Save'}
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

// ── Main Page ─────────────────────────────────────────────────────────────────

const AdminMembers = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [titleFilter, setTitleFilter] = useState('all')

  const fetchMembers = () => {
    getAllMembers()
      .then(setMembers)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchMembers() }, [])

  const titles = useMemo(() => ['all', ...new Set(members.map(m => m.title))], [members])

  const filtered = useMemo(() => members
    .filter(m => {
      const q = search.toLowerCase()
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    })
    .filter(m => roleFilter === 'all' || m.role === roleFilter)
    .filter(m => titleFilter === 'all' || m.title === titleFilter)
    , [members, search, roleFilter, titleFilter])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteMember(id)
      setMembers(prev => prev.filter(m => m.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} onInvited={fetchMembers} />}
      {editing && <EditModal member={editing} onClose={() => setEditing(null)} onSaved={fetchMembers} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Members
          </h1>
          <button
            onClick={() => setShowInvite(true)}
            className="relative overflow-hidden px-5 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + Invite
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
          />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="officer">Officer</option>
          </select>
          <select
            value={titleFilter}
            onChange={e => setTitleFilter(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            {titles.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Titles' : t}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-muted font-body text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted font-body text-sm">No members found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40"
              >
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

                <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border ${member.role === 'admin' ? 'text-accent border-accent/30 bg-accent-dim' : 'text-muted border-rim'}`}>
                  {member.role}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditing(member)}
                    className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    disabled={deletingId === member.id}
                    className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1 disabled:opacity-50"
                  >
                    {deletingId === member.id ? '...' : 'Remove'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminMembers
