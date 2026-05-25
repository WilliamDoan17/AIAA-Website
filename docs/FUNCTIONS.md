# Functions

## Edge Functions

### `invite-member`

**Method:** `POST`
**Auth:** Required (Bearer token) — admin only
**JWT Verify:** Off (auth handled manually inside the function)

**Description:**
Creates a new club member by provisioning an auth user and inserting a `club_members` record. Only callable by admins. Rolls back the auth user if the `club_members` insert fails.

**Request Payload:**
| Field | Type | Required |
|---|---|---|
| `email` | `string` | ✅ |
| `name` | `string` | ✅ |
| `role` | `'admin' \| 'officer'` | ✅ |
| `title` | `string` | ✅ |
| `photo` | `string` | ❌ |
| `bio` | `string` | ❌ |

**Response:**
| Status | Body |
|---|---|
| `200` | `{ success: true }` |
| `400` | `{ error: string }` |
| `401` | `{ error: string }` |
| `403` | `{ error: string }` |

**Environment Variables:**
| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for admin operations |
| `DEFAULT_PASSWORD` | Default password assigned to newly created users |

---

### `reset-password`

**Method:** `POST`
**Auth:** Required (Bearer token)
**JWT Verify:** On

**Description:**
Updates the calling user's password and marks `is_setup = true` in `club_members`. Both steps are handled server-side to prevent UI/server sync issues.

**Request Payload:**
| Field | Type | Required |
|---|---|---|
| `current_password` | `string` | ✅ |
| `new_password` | `string` | ✅ |

**Response:**
| Status | Body |
|---|---|
| `200` | `{ success: true }` |
| `400` | `{ error: string }` |
| `401` | `{ error: string }` |

**Environment Variables:**
| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for all operations |

---

## Database Functions

### `delete_auth_user()`

**Security:** `SECURITY DEFINER`
**Used by trigger:** `on_club_member_deleted`

**Description:**
Deletes the corresponding `auth.users` row when a `club_members` record is deleted. Requires `SECURITY DEFINER` to have permission to modify `auth.users`.

---

### `restrict_self_title_update()`

**Security:** `INVOKER`
**Used by trigger:** `enforce_self_title_restriction`

**Description:**
Prevents a non-admin member from updating their own `title` field. Admins updating their own or other members' titles and service role calls are unaffected.

---

### `is_project_admin(p_project_id uuid)`

**Returns:** `boolean`
**Security:** `SECURITY DEFINER`
**Used by:** RLS policies on `projects`

**Description:**
Returns `true` if the calling user (`auth.uid()`) has `role = 'admin'` in `project_members` for the given project. Uses `SECURITY DEFINER` to bypass RLS on `project_members`, preventing infinite recursion when policies on `projects` or `project_members` check project-level admin status.
