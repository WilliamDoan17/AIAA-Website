# SERVICES (suggestion)

This file will document Supabase and related backend services for the AIAA-Website. For each service, describe its role, integration details, and endpoint structure.

## auth
`src/services/auth.ts`

- login(email, password) -> `void` : Login with email and password
- logout() -> `void` : Logout of current user

## club_info
`src/services/clubInfo.ts`
- getClubInfo() -> `ClubInfo` : get club info

