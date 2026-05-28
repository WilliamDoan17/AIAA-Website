# Triggers

## `on_club_info_update`

**Table:** `public.club_info`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_club_member_update`

**Table:** `public.club_members`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_event_update`

**Table:** `public.events`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_project_update`

**Table:** `public.projects`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_project_member_update`

**Table:** `public.project_members`
**Event:** `BEFORE UPDATE`
**Function:** [`prevent_project_member_project_id_change()`](FUNCTIONS.md#prevent_project_member_project_id_change)

**Description:**
Blocks any attempt to change `project_id` on an existing `project_members` row.

---

## `on_project_member_set_updated_at`

**Table:** `public.project_members`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_post_update`

**Table:** `public.project_posts`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `on_comment_update`

**Table:** `public.project_post_comments`
**Event:** `BEFORE UPDATE`
**Function:** [`set_updated_at()`](FUNCTIONS.md#set_updated_at)

**Description:**
Refreshes `updated_at` to `now()` on every update.

---

## `enforce_self_title_restriction`

**Table:** `public.club_members`
**Event:** `BEFORE UPDATE`
**Function:** [`restrict_self_title_update()`](FUNCTIONS.md#restrict_self_title_update)

**Description:**
Prevents a non-admin member from updating their own `title`.

---

## `on_club_member_deleted`

**Table:** `public.club_members`
**Event:** `AFTER DELETE`
**Function:** [`delete_auth_user()`](FUNCTIONS.md#delete_auth_user)

**Description:**
Deletes the corresponding `auth.users` row when a `club_members` record is removed.

> **Note:** The reverse direction is not needed — `club_members.id` has a foreign key with `ON DELETE CASCADE` referencing `auth.users`.
