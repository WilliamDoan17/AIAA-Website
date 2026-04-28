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

## Database Functions

### `delete_auth_user()`

**Security:** `SECURITY DEFINER`  
**Used by trigger:** `on_club_member_deleted`

**Description:**  
Deletes the corresponding `auth.users` row when a `club_members` record is deleted. Requires `SECURITY DEFINER` to have permission to modify `auth.users`.
