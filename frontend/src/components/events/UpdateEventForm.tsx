import { useState } from 'react'
import { useUpdateEvent } from '../../hooks/events'
import type { Event, EventInsert, EventUpdate } from '../../types/events'

type EventFieldErrors = Partial<Record<
  'name' | 'description' | 'content' | 'cover_image' | 'location' | 'url' | 'start_time' | 'end_time',
  string
>>

const validateEventForm = (form: EventInsert): EventFieldErrors => {
  const errors: EventFieldErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.description.trim()) errors.description = 'Description is required'
  if (!form.content.trim()) errors.content = 'Content is required'
  if (!form.location.trim()) errors.location = 'Location is required'
  if (!form.start_time) errors.start_time = 'Start time is required'
  if (!form.end_time) {
    errors.end_time = 'End time is required'
  } else if (form.start_time && form.end_time <= form.start_time) {
    errors.end_time = 'End time must be after start time'
  }
  if (form.cover_image.trim()) {
    try { new URL(form.cover_image.trim()) } catch { errors.cover_image = 'Enter a valid URL' }
  }
  if (form.url?.trim()) {
    try { new URL(form.url.trim()) } catch { errors.url = 'Enter a valid URL' }
  }
  return errors
}

const toDatetimeLocal = (iso: string): string => {
  if (!iso) return ''
  const date = new Date(iso)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}

const fromDatetimeLocal = (local: string): string =>
  local ? new Date(local).toISOString() : ''

const textFields: { key: keyof EventInsert; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'location', label: 'Location' },
  { key: 'cover_image', label: 'Cover Image URL' },
  { key: 'url', label: 'Event URL (optional)' },
]

type Props = { event: Event; onClose: () => void }

const UpdateEventForm = ({ event, onClose }: Props) => {
  const [form, setForm] = useState<EventInsert>({
    name: event.name,
    description: event.description,
    content: event.content,
    cover_image: event.cover_image,
    location: event.location,
    url: event.url ?? '',
    start_time: toDatetimeLocal(event.start_time),
    end_time: toDatetimeLocal(event.end_time),
  })
  const [fieldErrors, setFieldErrors] = useState<EventFieldErrors>({})
  const { mutate: update, isPending, error: serverError } = useUpdateEvent()

  const setField = (key: keyof EventInsert, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof EventFieldErrors]) {
      setFieldErrors(e => ({ ...e, [key]: undefined }))
    }
  }

  const handleSubmit = () => {
    const errors = validateEventForm(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    const updates: EventUpdate = {
      ...form,
      cover_image: form.cover_image.trim(),
      url: form.url?.trim() || null,
      start_time: fromDatetimeLocal(form.start_time),
      end_time: fromDatetimeLocal(form.end_time),
    }
    update({ id: event.id, updates }, { onSuccess: onClose })
  }

  return (
    <div className="flex flex-col gap-5">
      {textFields.map(({ key, label }) => {
        const err = fieldErrors[key as keyof EventFieldErrors]
        return (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
            <input
              type="text"
              value={(form[key] as string) ?? ''}
              onChange={e => setField(key, e.target.value)}
              className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
            />
            {err && <p className="text-red-400 text-xs font-body">{err}</p>}
          </div>
        )
      })}

      {(['description', 'content'] as const).map(key => {
        const err = fieldErrors[key]
        return (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <textarea
              rows={key === 'content' ? 5 : 2}
              value={form[key]}
              onChange={e => setField(key, e.target.value)}
              className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
            />
            {err && <p className="text-red-400 text-xs font-body">{err}</p>}
          </div>
        )
      })}

      <div className="grid grid-cols-2 gap-4">
        {(['start_time', 'end_time'] as const).map(key => {
          const err = fieldErrors[key]
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
                {key === 'start_time' ? 'Start' : 'End'}
              </label>
              <input
                type="datetime-local"
                value={form[key]}
                onChange={e => setField(key, e.target.value)}
                className={`bg-surface border rounded-xl px-4 py-2.5 text-sm font-body text-copy focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {err && <p className="text-red-400 text-xs font-body">{err}</p>}
            </div>
          )
        })}
      </div>

      {serverError && <p className="text-red-400 text-xs font-body">Failed to save changes</p>}

      <div className="flex gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="relative overflow-hidden flex-1 py-2.5 rounded-xl border border-accent text-accent text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl border border-rim text-muted text-sm font-body hover:text-copy hover:border-muted transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default UpdateEventForm
