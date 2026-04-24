# HOOKS

Custom React hooks for data access. All hooks return `{ data, loading, error }` — components never need to know where data comes from.

---

## Auth

### `useAuth`
Reads from `AuthContext` (provided by `AuthProvider`).

| Return  | Type           | Notes                               |
|---------|----------------|-------------------------------------|
| user    | object \| null | Supabase user object, null if guest |
| loading | boolean        | true while session is resolving     |

> Backed by `supabase.auth.onAuthStateChange` — updates reactively on login/logout.

---

## Data (Stage 1: Mock)

All three hooks below currently return static mock data from `/data/`. `loading` is always `false` and `error` is always `null`. They will be replaced with Supabase queries in Stage 2.

### `useEvents`
| Return  | Type    | Source           |
|---------|---------|------------------|
| data    | Event[] | `data/events.js` |
| loading | boolean | always false     |
| error   | null    | always null      |

### `useMembers`
| Return  | Type     | Source            |
|---------|----------|-------------------|
| data    | Member[] | `data/members.js` |
| loading | boolean  | always false      |
| error   | null     | always null       |

### `useProjects`
| Return  | Type      | Source             |
|---------|-----------|--------------------|
| data    | Project[] | `data/projects.js` |
| loading | boolean   | always false       |
| error   | null      | always null        |
