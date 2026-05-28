import { useState, useEffect } from 'react'
import type { ClubInfo } from '../../types/club'

type Props = {
  clubInfo: ClubInfo
  onSave: (form: { name: string; cover_image: string; about: string }) => void
  saving: boolean
  saved: boolean
  saveError: Error | null
}

const ClubForm = ({ clubInfo, onSave, saving, saved, saveError }: Props) => {
  const [form, setForm] = useState({ name: '', cover_image: '', about: '' })

  useEffect(() => {
    setForm({ name: clubInfo.name, cover_image: clubInfo.cover_image, about: clubInfo.about })
  }, [clubInfo])

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
          Name
        </label>
        <input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
          Cover Image URL
        </label>
        <input
          value={form.cover_image}
          onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
          className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
        />
        {form.cover_image && (
          <img
            src={form.cover_image}
            alt="Cover preview"
            className="mt-2 h-32 w-full object-cover rounded-xl border border-rim"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
          About
        </label>
        <textarea
          value={form.about}
          onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
          rows={5}
          className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="relative overflow-hidden px-6 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && <span className="text-accent text-sm font-body">Saved</span>}
        {saveError && <span className="text-red-400 text-sm font-body">Failed to save changes</span>}
      </div>

    </div>
  )
}

export default ClubForm
