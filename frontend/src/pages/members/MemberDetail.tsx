import { useParams, useNavigate } from 'react-router-dom'
import { useMember } from '../../hooks/members'

const MemberDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: member, isLoading, isError } = useMember(id!)

  if (isLoading) return <p className="font-body text-sm text-muted">Loading...</p>

  if (isError || !member) return (
    <div className="flex flex-col gap-4">
      <p className="font-body text-sm text-muted">Member not found.</p>
      <button
        onClick={() => navigate(-1)}
        className="self-start font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200"
      >
        ← Back
      </button>
    </div>
  )

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <button
        onClick={() => navigate(-1)}
        className="self-start font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200"
      >
        ← Back
      </button>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="w-40 h-52 flex-shrink-0 overflow-hidden border border-rim">
          {member.photo
            ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-rim" />
          }
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <div>
            <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent mb-2">
              {member.title}
            </p>
            <h1 className="font-display text-2xl font-black uppercase tracking-wide text-copy leading-tight">
              {member.name}
            </h1>
          </div>

          {member.bio && (
            <p className="font-body text-sm text-muted leading-relaxed">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberDetail
