import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useMember, useUpdateMember } from '../../hooks/members'

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

const UpdateProfileSection = () => {
  const { user, refetchMember } = useAuth()
  const { data: member } = useMember(user?.id ?? '')
  const { mutate: update, isPending: saving, error: updateError } = useUpdateMember()
  const isAdmin = member?.role === 'admin'

  const [form, setForm] = useState({
    name: member?.name ?? '',
    photo: member?.photo ?? '',
    bio: member?.bio ?? '',
    title: member?.title ?? '',
  })
  const [success, setSuccess] = useState(false)

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSave = () => {
    if (!member) return
    const updates: Record<string, string> = {
      name: form.name.trim(),
      photo: form.photo.trim(),
      bio: form.bio.trim(),
    }
    if (isAdmin) updates.title = form.title.trim()
    update(
      { id: member.id, updates },
      {
        onSuccess: () => {
          refetchMember()
          setSuccess(true)
        },
      }
    )
  }

  if (!member) return null

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Profile</h2>
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

      {updateError && <p className="text-red-400 text-xs font-body">Failed to save changes</p>}
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

export default UpdateProfileSection
