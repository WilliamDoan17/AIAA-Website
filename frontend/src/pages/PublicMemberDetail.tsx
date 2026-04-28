import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMemberInfo } from '../services/members'
import type { Member } from '../types/member'

const PublicMemberDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (!id) return
    getMemberInfo(id)
      .then(setMember)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-void text-copy flex items-center justify-center">
      <p className="font-body text-sm text-muted">Loading...</p>
    </div>
  )

  if (error || !member) return (
    <div className="min-h-screen bg-void text-copy flex flex-col items-center justify-center gap-4">
      <p className="font-body text-sm text-muted">Member not found.</p>
      <Link to="/members" className="font-display text-xs uppercase tracking-widest text-accent hover:text-copy transition-colors duration-200">
        ← Back to Members
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-void text-copy starfield pb-24">
      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-16 pt-20">

        <Link
          to="/members"
          className="inline-block font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors duration-200 mb-10"
        >
          ← Members
        </Link>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start fade-up">

          <div className={`relative w-full md:w-72 aspect-[3/4] flex-shrink-0 overflow-hidden border ${member.title === 'President' ? 'border-[rgba(240,165,0,0.3)] president-bar' : 'border-rim'}`}>
            {member.photo
              ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-rim" />
            }
          </div>

          <div className="flex flex-col gap-5 pt-0 md:pt-2">
            <div>
              <p className={`font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] mb-3 ${member.title === 'President' ? 'text-gold' : 'text-accent'}`}>
                {member.title}
              </p>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy leading-[1.1]">
                {member.name}
              </h1>
            </div>

            {member.bio && (
              <p className="font-body text-sm text-muted leading-relaxed max-w-xl">
                {member.bio}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default PublicMemberDetail
