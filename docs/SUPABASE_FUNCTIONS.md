# Supabase Functions

## Edge Functions

### `invite-member`

**Method:** `POST`  
**Auth:** Required (Bearer token)  
**JWT Verify:** Off (auth handled manually inside the function)

**Description:**  
Creates a new club member by provisioning an auth user and inserting a corresponding `club_members` record. Only accessible by admins.

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

**Logic:**
1. Validates the `Authorization` header is present
2. Verifies the calling user exists via auth token
3. Checks the caller has `role = 'admin'` in `club_members`
4. Creates a new auth user using `DEFAULT_PASSWORD` env var
5. Inserts a new row into `club_members`
6. On insert failure, rolls back by deleting the created auth user

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
Updates the user's password and marks `is_setup = true` in `club_members`. Both steps are handled server-side to prevent UI/server sync issues.

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

**Logic:**
1. Validates the `Authorization` header is present
2. Decodes user ID and email from the verified JWT (no network call)
3. Calls `auth.signInWithPassword` via service role client to verify current password
4. Updates password via `auth.admin.updateUserById`
5. Sets `is_setup = true` in `club_members`

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
Prevents a member from updating their own `title` field. Raises an exception if `auth.uid() = OLD.id` and `title` has changed. Admins updating other members and service role calls are unaffected.
