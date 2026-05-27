import { useState } from 'react'
import { resetPassword } from '../../services/auth'

interface FieldProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
}

const Field = ({ label, type = 'text', value, onChange }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
    />
  </div>
)

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
      <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Reset Password</h2>

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

export default ResetPasswordSection
