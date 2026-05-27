import { useState, useMemo } from 'react'
import { useMembers, useDeleteMember } from '../../hooks/members'
import type { Member } from '../../types/members'
import InviteMemberModal from '../../components/members/InviteMemberModal'
import UpdateMemberModal from '../../components/members/UpdateMemberModal'
import AdminMemberCard from '../../components/members/AdminMemberCard'

type ModalState =
  | { type: 'invite' }
  | { type: 'update'; member: Member }
  | null

const AdminMemberList = () => {
  const { data: members = [], isLoading: loading } = useMembers()
  const { mutate: remove, isPending: isDeleting, variables: deletingId } = useDeleteMember()
  const [modal, setModal] = useState<ModalState>(null)
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
      {modal?.type === 'invite' && <InviteMemberModal onClose={() => setModal(null)} />}
      {modal?.type === 'update' && <UpdateMemberModal member={modal.member} onClose={() => setModal(null)} />}

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
            Members
          </h1>
          <button
            onClick={() => setModal({ type: 'invite' })}
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
              <AdminMemberCard
                key={member.id}
                member={member}
                onEdit={() => setModal({ type: 'update', member })}
                onRemove={() => remove(member.id)}
                removing={isDeleting && deletingId === member.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AdminMemberList
