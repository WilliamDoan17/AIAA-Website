import CreateEventForm from './CreateEventForm'

type Props = { onClose: () => void }

const CreateEventModal = ({ onClose }: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
    <div className="bg-panel border border-rim rounded-2xl w-full max-w-lg mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-copy">New Event</h2>
        <button onClick={onClose} className="text-muted hover:text-copy transition-colors duration-200 font-body text-lg leading-none">✕</button>
      </div>
      <CreateEventForm onClose={onClose} />
    </div>
  </div>
)

export default CreateEventModal
