import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { updateMember } from '../services/members'
import { resetPassword } from '../services/auth'

// ── Field ─────────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  placeholder?: string
}

const Field = ({ label, type = 'text', value, onChange, disabled, placeholder }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
)

// ── Edit Profile Section ──────────────────────────────────────────────────────

const EditProfileSection = () => {
  const { member, refetchMember } = useAuth()
  const isAdmin = member?.role === 'admin'

  const [form, setForm] = useState({
    name: member?.name ?? '',
    photo: member?.photo ?? '',
    bio: member?.bio ?? '',
    title: member?.title ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSave = async () => {
    if (!member) return
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const updates: Record<string, string> = {
        name: form.name.trim(),
        photo: form.photo.trim(),
        bio: form.bio.trim(),
      }
      if (isAdmin) updates.title = form.title.trim()
      await updateMember(member.id, updates)
      await refetchMember()
      setSuccess(true)
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (!member) return null

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
          Profile
        </h2>
        <p className="font-body text-xs text-muted mt-1">{member.email}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Name" value={form.name} onChange={setField('name')} />
        <Field label="Photo URL" value={form.photo} onChange={setField('photo')} placeholder="https://..." />
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setField('bio')(e.target.value)}
            rows={4}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
          />
        </div>
        {isAdmin ? (
          <Field label="Title" value={form.title} onChange={setField('title')} />
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
            <p className="font-body text-sm text-muted px-4 py-2.5">{member.title}</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs font-body">{error}</p>}
      {success && <p className="text-accent text-xs font-body">Profile updated.</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="relative overflow-hidden self-start px-6 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

// ── Reset Password Section ────────────────────────────────────────────────────

const ResetPasswordSection = () => {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleReset = async () => {
    setError(null)
    setSuccess(false)
    if (!form.current || !form.next || !form.confirm) {
      setError('All fields are required')
      return
    }
    if (form.next !== form.confirm) {
      setError('New passwords do not match')
      return
    }
    if (form.next.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }
    setSaving(true)
    try {
      await resetPassword(form.current, form.next)
      setForm({ current: '', next: '', confirm: '' })
      setSuccess(true)
    } catch {
      setError('Failed to reset password. Check your current password and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
        Reset Password
      </h2>

      <div className="flex flex-col gap-4">
        <Field label="Current Password" type="password" value={form.current} onChange={setField('current')} />
        <Field label="New Password" type="password" value={form.next} onChange={setField('next')} />
        <Field label="Confirm New Password" type="password" value={form.confirm} onChange={setField('confirm')} />
      </div>

      {error && <p className="text-red-400 text-xs font-body">{error}</p>}
      {success && <p className="text-accent text-xs font-body">Password updated successfully.</p>}

      <button
        onClick={handleReset}
        disabled={saving}
        className="relative overflow-hidden self-start px-6 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {saving ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const MemberProfile = () => {
  return (
    <div className="max-w-xl flex flex-col gap-10">
      <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
        My Profile
      </h1>

      <EditProfileSection />

      <div className="border-t border-rim" />

      <ResetPasswordSection />
    </div>
  )
}

export default MemberProfile
