import { useState } from 'react'
import { resetPassword } from '../services/auth'
import useAuth from '../hooks/useAuth'

const SetupGuardModal = () => {
  const { refetchMember } = useAuth()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    setError(null)
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
      await refetchMember()
    } catch {
      setError('Failed to reset password. Check your current password and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">
            Set Your Password
          </h2>
          <p className="font-body text-xs text-muted mt-2 leading-relaxed">
            For security reasons, you must reset your password before continuing.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { key: 'current', label: 'Current Password' },
            { key: 'next', label: 'New Password' },
            { key: 'confirm', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
              <input
                type="password"
                value={form[key as keyof typeof form]}
                onChange={e => setField(key as keyof typeof form)(e.target.value)}
                className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-xs font-body">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="relative overflow-hidden py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {saving ? 'Updating...' : 'Set Password'}
        </button>
      </div>
    </div>
  )
}

export default SetupGuardModal
