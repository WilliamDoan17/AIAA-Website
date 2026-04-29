export type ClubRole = 'admin' | 'officer'

export interface Member {
  id: string
  created_at: string
  email: string
  name: string
  role: ClubRole
  title: string
  photo: string
  bio: string
  is_setup: boolean
}

export type MemberInput = Omit<Member, 'id' | 'created_at' | 'is_setup'>
