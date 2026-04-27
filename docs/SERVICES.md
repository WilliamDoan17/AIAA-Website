# SERVICES (suggestion)

This file will document Supabase and related backend services for the AIAA-Website. For each service, describe its role, integration details, and endpoint structure.

## auth
`src/services/auth.ts`

- login(email, password) -> `void` : Login with email and password
- logout() -> `void` : Logout of current user

## club_info
`src/services/clubInfo.ts`
- getClubInfo() -> `ClubInfo` : get club info
- updateClubInfo(updates: `Partial<ClubInfo>`): update club info (admin-only)

## members 
`src/services/members.ts`

- getAllMembers() -> `Member[]`: get all members
- getMemberInfo(id: string) -> `Member`: get member info (admin can get all, or officer can read their own)
- inviteMember(info: `MemberInput`) -> `void`: invite member with email as `info.email` to set up their account
- updateMember(id, updates: `Partial<Member>`) -> `void`: update member info (admin can update all, or officer can only
update their own)
- deleteMember(id) -> `void`: delete member (admin only)

