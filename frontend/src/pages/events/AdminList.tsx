import { useState, useMemo } from 'react'
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/events'
import type { Event, EventInsert, EventUpdate, EventStatus } from '../../types/events'
import { formatEventTime } from '../../utils/formatEventTime'

const getEventStatus = (event: Event): EventStatus => {
  const now = Date.now()
  const start = new Date(event.start_time).getTime()
  const end = new Date(event.end_time).getTime()
  if (now < start) return 'upcoming'
  if (now > end) return 'completed'
  return 'ongoing'
}

const statusLabel: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
}

// ── Shared helpers ────────────────────────────────────────────────────────────

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

// UTC ISO → local datetime-local string for <input type="datetime-local">
const toDatetimeLocal = (iso: string): string => {
  if (!iso) return ''
  const date = new Date(iso)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}

// local datetime-local string → UTC ISO for Supabase
const fromDatetimeLocal = (local: string): string =>
  local ? new Date(local).toISOString() : ''

// ── Create Modal ──────────────────────────────────────────────────────────────

interface CreateModalProps {
  onClose: () => void
}

const CreateModal = ({ onClose }: CreateModalProps) => {
  const [form, setForm] = useState<EventInsert>({
    name: '', description: '', content: '', cover_image: '',
    location: '', url: '', start_time: '', end_time: '',
  })
  const [fieldErrors, setFieldErrors] = useState<EventFieldErrors>({})
  const { mutate: create, isPending, error: createError } = useCreateEvent()

  const setField = (key: keyof EventInsert, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (fieldErrors[key as keyof EventFieldErrors]) {
      setFieldErrors(e => ({ ...e, [key]: undefined }))
    }
  }

  const handleSubmit = () => {
    const errors = validateEventForm(form)
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    create(
      {
        ...form,
        cover_image: form.cover_image.trim(),
        url: form.url?.trim() || null,
        start_time: fromDatetimeLocal(form.start_time),
        end_time: fromDatetimeLocal(form.end_time),
      },
      { onSuccess: onClose }
    )
  }

  return (
    <EventFormModal
      title="New Event"
      form={form}
      fieldErrors={fieldErrors}
      isPending={isPending}
      submitLabel="Create Event"
      pendingLabel="Creating..."
      serverError={createError ? 'Failed to create event' : null}
      onField={setField}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

// ── Edit Modal ────────────────────────────────────────────────────────────────

interface EditModalProps {
  event: Event
  onClose: () => void
}

const EditModal = ({ event, onClose }: EditModalProps) => {
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
  const { mutate: update, isPending, error: updateError } = useUpdateEvent()

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
    <EventFormModal
      title="Edit Event"
      form={form}
      fieldErrors={fieldErrors}
      isPending={isPending}
      submitLabel="Save Changes"
      pendingLabel="Saving..."
      serverError={updateError ? 'Failed to save changes' : null}
      onField={setField}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

// ── Shared form UI ────────────────────────────────────────────────────────────

interface EventFormModalProps {
  title: string
  form: EventInsert
  fieldErrors: EventFieldErrors
  isPending: boolean
  submitLabel: string
  pendingLabel: string
  serverError: string | null
  onField: (key: keyof EventInsert, value: string) => void
  onSubmit: () => void
  onClose: () => void
}

const textFields: { key: keyof EventInsert; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'location', label: 'Location' },
  { key: 'cover_image', label: 'Cover Image URL' },
  { key: 'url', label: 'Event URL (optional)' },
]

const EventFormModal = ({
  title, form, fieldErrors, isPending, submitLabel, pendingLabel,
  serverError, onField, onSubmit, onClose,
}: EventFormModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
    <div className="bg-panel border border-rim rounded-lg w-full max-w-lg mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">{title}</h2>
        <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
      </div>

      {textFields.map(({ key, label }) => {
        const err = fieldErrors[key as keyof EventFieldErrors]
        return (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-medium text-muted uppercase tracking-widest">{label}</label>
            <input
              type="text"
              value={(form[key] as string) ?? ''}
              onChange={e => onField(key, e.target.value)}
              className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
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
              onChange={e => onField(key, e.target.value)}
              className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
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
                onChange={e => onField(key, e.target.value)}
                className={`bg-surface border rounded px-4 py-2.5 text-sm font-body text-copy focus:outline-none transition-colors duration-200 ${err ? 'border-red-400 focus:border-red-400' : 'border-rim focus:border-accent'}`}
              />
              {err && <p className="text-red-400 text-xs font-body">{err}</p>}
            </div>
          )
        })}
      </div>

      {serverError && <p className="text-red-400 text-xs font-body">{serverError}</p>}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onSubmit}
          disabled={isPending}
          className="relative overflow-hidden flex-1 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? pendingLabel : submitLabel}
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

// ── Delete Confirm Modal ───────────────────────────────────────────────────────

interface DeleteModalProps {
  event: Event
  onClose: () => void
}

const DeleteModal = ({ event, onClose }: DeleteModalProps) => {
  const { mutate: remove, isPending, error: deleteError } = useDeleteEvent()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
      <div className="bg-panel border border-rim rounded-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">Delete Event</h2>
          <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
        </div>

        <p className="font-body text-sm text-muted">
          Are you sure you want to delete <span className="text-copy font-medium">{event.name}</span>? This cannot be undone.
        </p>

        {deleteError && <p className="text-red-400 text-xs font-body">Failed to delete event</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => remove(event.id, { onSuccess: onClose })}
            disabled={isPending}
            className="relative overflow-hidden flex-1 py-2.5 rounded border border-red-400 text-red-400 text-sm font-body font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-400/10 transition-colors duration-200"
          >
            {isPending ? 'Deleting...' : 'Delete'}
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

const AdminEventList = () => {
  const { data: events = [], isLoading: loading } = useEvents()
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [deleting, setDeleting] = useState<Event | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => events
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => statusFilter === 'all' || getEventStatus(e) === statusFilter)
    .sort((a, b) => {
      const byStart = new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      return byStart !== 0 ? byStart : new Date(a.end_time).getTime() - new Date(b.end_time).getTime()
    })
    , [events, search, statusFilter])

  return (
    <>
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
      {editing && <EditModal event={editing} onClose={() => setEditing(null)} />}
      {deleting && <DeleteModal event={deleting} onClose={() => setDeleting(null)} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Events
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            className="relative overflow-hidden px-5 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + New Event
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p className="text-muted font-body text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted font-body text-sm">No events found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(event => {
              const status = getEventStatus(event)
              const eventTime = formatEventTime(event.start_time, event.end_time)

              return (
                <div
                  key={event.id}
                  className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-copy truncate">{event.name}</p>
                    <p className="font-body text-xs text-muted truncate">
                      {eventTime} · {event.location}
                    </p>
                  </div>

                  <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border flex-shrink-0 ${status === 'ongoing'
                    ? 'text-gold border-gold/30'
                    : status === 'upcoming'
                      ? 'text-accent border-accent/30'
                      : 'text-muted border-rim'
                    }`}>
                    {statusLabel[status]}
                  </span>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditing(event)}
                      className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(event)}
                      className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminEventList
