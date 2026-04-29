# Database Triggers

## `enforce_self_title_restriction`

**Table:** `public.club_members`
**Event:** `BEFORE UPDATE`
**Function:** `restrict_self_title_update()`

**Description:**
Prevents a non-admin member from updating their own `title`. Admins can update their own title since `OLD.role = 'admin'` bypasses the check. Admins updating other members are also unaffected since `auth.uid() = OLD.id` is false. The service role (edge functions) is unaffected since `auth.uid()` returns `null`.

**Flow:**
1. UPDATE is attempted on `club_members`
2. If `auth.uid() = OLD.id` and `NEW.title != OLD.title` and `OLD.role != 'admin'`, raise exception
3. Otherwise allow the update

---

## `on_club_member_deleted`

**Table:** `public.club_members`  
**Event:** `AFTER DELETE`  
**Function:** `delete_auth_user()`

**Description:**  
When a `club_members` row is deleted, automatically deletes the corresponding user from `auth.users`. This ensures no orphaned auth users are left behind when a member is removed.

**Flow:**
1. `club_members` row is deleted
2. Trigger fires and calls `delete_auth_user()`
3. Corresponding `auth.users` row is deleted

> **Note:** The reverse direction (deleting `club_members` when an auth user is deleted) is not needed because `club_members.id` has a foreign key with `ON DELETE CASCADE` referencing `auth.users`, which handles cleanup automatically.
