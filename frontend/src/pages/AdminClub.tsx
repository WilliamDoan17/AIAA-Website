import { useState, useEffect } from 'react'
import { getClubInfo, updateClubInfo } from '../services/club'
import type { ClubInfo } from '../types/club'

const AdminClub = () => {
  const [info, setInfo] = useState<ClubInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)

  useEffect(() => {
    getClubInfo()
      .then(setInfo)
      .catch(() => setError('Failed to load club info'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!info) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await updateClubInfo({ name: info.name, cover_image: info.cover_image, about: info.about })
      setSaved(true)
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <p className="text-muted font-body text-sm">Loading...</p>
  )

  if (!info) return (
    <p className="text-muted font-body text-sm">{error ?? 'No club info found'}</p>
  )

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline mb-8">
        Club Info
      </h1>

      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
            Name
          </label>
          <input
            value={info.name}
            onChange={e => setInfo({ ...info, name: e.target.value })}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
            Cover Image URL
          </label>
          <input
            value={info.cover_image}
            onChange={e => setInfo({ ...info, cover_image: e.target.value })}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200"
          />
          {info.cover_image && (
            <img
              src={info.cover_image}
              alt="Cover preview"
              className="mt-2 h-32 w-full object-cover rounded border border-rim"
            />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
            About
          </label>
          <textarea
            value={info.about}
            onChange={e => setInfo({ ...info, about: e.target.value })}
            rows={5}
            className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="relative overflow-hidden px-6 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-accent text-sm font-body">Saved</span>
          )}
          {error && (
            <span className="text-red-400 text-sm font-body">{error}</span>
          )}
        </div>

      </div>
    </div>
  )
}

export default AdminClub
