import { useState } from 'react'
import { useUpdateMember } from '../../hooks/members'
import type { Member, ClubRole } from '../../types/members'

type Props = { member: Member; onClose: () => void }

const UpdateMemberModal = ({ member, onClose }: Props) => {
  const [form, setForm] = useState({ role: member.role, title: member.title })
  const { mutate: update, isPending: saving, error: updateError } = useUpdateMember()

  const handleSave = () => {
    update({ id: member.id, updates: form }, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Edit Member</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted -mt-2">{member.name}</p>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Title</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as ClubRole })}
            className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {updateError && <p className="text-red-400 text-xs font-body">Failed to save changes</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="relative overflow-hidden flex-1 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? 'Saving...' : 'Save'}
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

export default UpdateMemberModal
