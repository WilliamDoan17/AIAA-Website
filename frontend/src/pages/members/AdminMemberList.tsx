import { useState, useMemo } from 'react'
import { useMembers, useDeleteMember } from '../../hooks/members'
import type { Member } from '../../types/members'
import InviteMemberModal from '../../components/members/InviteMemberModal'
import UpdateMemberModal from '../../components/members/UpdateMemberModal'

const AdminMemberList = () => {
  const { data: members = [], isLoading: loading } = useMembers()
  const { mutate: remove, isPending: isDeleting, variables: deletingId } = useDeleteMember()
  const [showInvite, setShowInvite] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [titleFilter, setTitleFilter] = useState('all')

  const titles = useMemo(() => ['all', ...new Set(members.map(m => m.title))], [members])

  const filtered = useMemo(() => members
    .filter(m => {
      const q = search.toLowerCase()
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    })
    .filter(m => roleFilter === 'all' || m.role === roleFilter)
    .filter(m => titleFilter === 'all' || m.title === titleFilter)
    , [members, search, roleFilter, titleFilter])

  return (
    <>
      {showInvite && <InviteMemberModal onClose={() => setShowInvite(false)} />}
      {editing && <UpdateMemberModal member={editing} onClose={() => setEditing(null)} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Members
          </h1>
          <button
            onClick={() => setShowInvite(true)}
            className="relative overflow-hidden px-5 py-2 rounded border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest cta-btn transition-colors duration-200"
          >
            + Invite
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200 w-64"
          />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="officer">Officer</option>
          </select>
          <select
            value={titleFilter}
            onChange={e => setTitleFilter(e.target.value)}
            className="bg-surface border border-rim rounded px-4 py-2 text-sm font-body text-copy focus:outline-none focus:border-accent transition-colors duration-200"
          >
            {titles.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Titles' : t}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-muted font-body text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted font-body text-sm">No members found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-4 bg-surface border border-rim rounded px-5 py-4 transition-[border-color] duration-200 hover:border-accent/40"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-rim flex-shrink-0">
                  {member.photo
                    ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-rim" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-copy truncate">{member.name}</p>
                  <p className="font-body text-xs text-muted truncate">{member.email}</p>
                </div>

                <span className="font-display text-[0.6rem] uppercase tracking-widest text-muted hidden sm:block">
                  {member.title}
                </span>

                <span className={`font-display text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded border ${member.role === 'admin' ? 'text-accent border-accent/30 bg-accent-dim' : 'text-muted border-rim'}`}>
                  {member.role}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditing(member)}
                    className="font-body text-xs text-muted hover:text-copy transition-colors duration-200 px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(member.id)}
                    disabled={isDeleting && deletingId === member.id}
                    className="font-body text-xs text-muted hover:text-red-400 transition-colors duration-200 px-2 py-1 disabled:opacity-50"
                  >
                    {isDeleting && deletingId === member.id ? '...' : 'Remove'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminMemberList
