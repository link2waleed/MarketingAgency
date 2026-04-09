# Database Schema Reference

## Overview

Complete PostgreSQL schema for the Marketing Agency application. All tables have RLS policies and automatic timestamp management.

---

## Table: user_profiles

**Purpose**: Extended user information beyond Supabase authentication

**Auto-Created**: Automatically when user signs up via `handle_new_user()` trigger

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PK, FK (auth.users) | User's unique identifier |
| email | TEXT | NOT NULL | User email address |
| full_name | TEXT | - | User's full name |
| company_name | TEXT | - | Company/organization name |
| phone_number | TEXT | - | Contact phone number |
| avatar_url | TEXT | - | Profile picture URL |
| bio | TEXT | - | User bio/description |
| website | TEXT | - | Personal/company website |
| location | TEXT | - | City/country |
| timezone | TEXT | - | User's timezone (for scheduling) |
| email_verified | BOOLEAN | DEFAULT false | Email verification status |
| notifications_enabled | BOOLEAN | DEFAULT true | Receive alerts |
| newsletter_subscribed | BOOLEAN | DEFAULT false | Marketing newsletter opt-in |
| status | TEXT | CHECK (active/inactive/...) | User account status |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |
| last_login_at | TIMESTAMP | - | Last login time |

**Indexes**:
- `email` - Fast user lookup
- `status` - Filter by account status
- `created_at` - Sort by join date

**RLS Policies**:
1. `SELECT` - Users see own profile only
2. `INSERT` - Users create own profile only
3. `UPDATE` - Users update own profile only
4. `DELETE` - Service role only (via trigger)

**Triggers**:
- `on_auth_user_created` → Calls `handle_new_user()`
- `update_user_profiles_updated_at` → Updates `updated_at` on changes

**Example Data**:
```
id: 550e8400-e29b-41d4-a716-446655440000
email: john@example.com
full_name: John Developer
company_name: Tech Startup Inc
status: active
created_at: 2026-04-08 10:30:00
```

---

## Table: projects

**Purpose**: Track marketing projects, campaigns, and client work

**Relationships**:
- FK `user_id` → `user_profiles.id` (each project belongs to one user)
- FK `service_id` → `services.id` (each project uses a service)

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PK | Project unique identifier |
| user_id | UUID | FK, NOT NULL | Owner of project |
| name | TEXT | NOT NULL | Project name |
| description | TEXT | - | Detailed project description |
| client_name | TEXT | - | Client company name |
| service_id | UUID | FK | Primary service used |
| status | TEXT | CHECK (planning/...) | Current status |
| start_date | DATE | - | Project start date |
| end_date | DATE | - | Expected completion date |
| progress | INTEGER | CHECK (0-100) | Progress percentage |
| budget | DECIMAL(10,2) | - | Total project budget |
| spent | DECIMAL(10,2) | DEFAULT 0 | Amount spent so far |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Status Values**:
- `planning` - In planning phase
- `in-progress` - Currently active
- `completed` - Finished
- `on-hold` - Paused
- `cancelled` - Abandoned

**Indexes**:
- `user_id` - Find user's projects
- `status` - Filter by status
- `created_at` - Sort by date

**RLS Policies**:
1. `SELECT` - Users view own projects only
2. `INSERT` - Users create projects
3. `UPDATE` - Users update own projects only
4. `DELETE` - Users delete own projects only

**Trigger**:
- `update_projects_updated_at` → Auto-updates `updated_at` on changes

**Example Data**:
```
id: 660e8400-e29b-41d4-a716-446655440000
user_id: 550e8400-e29b-41d4-a716-446655440000
name: Q2 Social Media Campaign
client_name: Acme Corp
status: in-progress
budget: 5000.00
spent: 2500.00
progress: 50
start_date: 2026-04-01
end_date: 2026-06-30
```

---

## Table: services

**Purpose**: Marketing services catalog (public-facing service menu)

**Access**:
- `SELECT` - Public (everyone sees active services)
- `INSERT/UPDATE/DELETE` - Admin/service role only

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PK | Service unique identifier |
| name | TEXT | NOT NULL | Service name |
| slug | TEXT | NOT NULL, UNIQUE | URL-friendly identifier |
| description | TEXT | - | Full service description |
| category | TEXT | - | Service category (social-media, seo, etc) |
| price | DECIMAL(10,2) | - | Monthly/project price |
| duration | TEXT | - | Service duration ("1 month", "3-4 weeks") |
| rating | DECIMAL(3,1) | DEFAULT 4.5 | Average rating (1-5) |
| popularity | INTEGER | DEFAULT 50 | Popularity score (0-100) |
| features | JSONB | DEFAULT '[]' | Array of feature strings |
| benefits | JSONB | DEFAULT '[]' | Array of benefit strings |
| icon | TEXT | - | Icon URL or name |
| image_url | TEXT | - | Service cover image URL |
| is_active | BOOLEAN | DEFAULT true | Show in catalog |
| meta_title | TEXT | - | SEO meta title |
| meta_description | TEXT | - | SEO meta description |
| keywords | TEXT[] | DEFAULT '{}' | SEO keywords array |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**JSONB Examples**:
```json
features: [
  "Content calendar management",
  "Daily posting and engagement",
  "Community moderation",
  "Monthly analytics reports"
]

benefits: [
  "Increased brand awareness",
  "Higher engagement rates",
  "Community growth"
]
```

**Indexes**:
- `slug` - Fast URL lookups
- `category` - Filter by service type
- `is_active` - Show only active services
- `rating` - Sort by rating

**RLS Policies**:
1. `SELECT` - Everyone views active services (WHERE is_active = true)
2. `INSERT/UPDATE/DELETE` - Service role/admin only

**Trigger**:
- `update_services_updated_at` → Auto-updates `updated_at` on changes

**Sample Services** (Seeded by 004 migration):
1. **Social Media Marketing** - $2,999/mo
2. **Paid Advertising** - $4,999/mo
3. **SEO Optimization** - $3,499/mo
4. **Web Development** - $5,999 (2-3 months)
5. **Brand Strategy** - $3,999 (4 weeks)
6. **Analytics & Reporting** - $1,999/mo

---

## Key Concepts

### Row Level Security (RLS)

All tables have RLS enabled:

**user_profiles**:
```sql
-- Only see own profile
SELECT * FROM user_profiles WHERE id = auth.uid();

-- Only update own profile
UPDATE user_profiles SET ... WHERE id = auth.uid();
```

**projects**:
```sql
-- Only see own projects
SELECT * FROM projects WHERE user_id = auth.uid();

-- Only update own projects
UPDATE projects SET ... WHERE user_id = auth.uid() AND id = <project_id>;
```

**services**:
```sql
-- All users (including anonymous) see active services
SELECT * FROM services WHERE is_active = true;

-- Only admin/service role can write
INSERT INTO services ... -- restricted to service role
```

### Automatic Timestamps

Every table has:

1. **created_at** - Set once on INSERT, never changes
2. **updated_at** - Set on INSERT, automatically updated on any UPDATE

Trigger function `update_*_updated_at_column()`:
```sql
NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
```

### Auto-Created User Profiles

When user signs up via Supabase Auth:

1. User record inserted into `auth.users` (Supabase managed)
2. Trigger `on_auth_user_created` fires
3. Calls function `handle_new_user()`
4. Creates record in `user_profiles` with:
   - `id` = auth.uid()
   - `email` = new user's email
   - All other fields = NULL (can be updated later)

**No manual profile creation needed!**

---

## Relationships Diagram

```
auth.users (Supabase managed)
    ↓ (1:1)
user_profiles
    ↓ (1:N)
projects
    ↓ (N:1)
services
```

**Key Relationships**:
- 1 user → many projects
- 1 service → many projects
- Projects track which service is used

---

## Common Queries

### Get user's projects with service details:
```sql
SELECT 
  p.id, p.name, p.status, p.budget, p.spent,
  s.name as service_name, s.price
FROM projects p
LEFT JOIN services s ON p.service_id = s.id
WHERE p.user_id = auth.uid()
ORDER BY p.created_at DESC;
```

### Get active services with features:
```sql
SELECT 
  id, name, price, duration, rating,
  features, benefits
FROM services
WHERE is_active = true
ORDER BY popularity DESC;
```

### Get user profile with login stats:
```sql
SELECT 
  email, full_name, company_name, status,
  last_login_at, created_at
FROM user_profiles
WHERE id = auth.uid();
```

---

## Migration Files

| File | Action | Count |
|------|--------|-------|
| 001 | Create user_profiles table | 1 |
| 002 | Create projects table | 1 |
| 003 | Create services table | 1 |
| 004 | Insert sample services | 6 |

Run in order: `001 → 002 → 003 → 004`

---

## Next Steps

After running migrations:

1. **Test Profile Creation**
   - Sign up new user
   - Verify profile auto-created in user_profiles table
   - Check all fields are NULL except id and email

2. **Add to Signup Form** (optional)
   - Capture company_name in signup
   - Capture phone_number
   - Capture timezone for scheduling
   - Update profile after signup

3. **Create More Tables** (as needed)
   - `orders` - Track purchases
   - `case_studies` - Portfolio items
   - `testimonials` - Client reviews
   - `faq` - Frequently asked questions

4. **Admin Dashboard**
   - Services management page
   - Create/edit/delete services
   - View all projects (admin view)
   - Manage user accounts

---

## Security Notes

✅ **All tables have RLS enabled** - Users can't see other users' data

✅ **Foreign keys configured** - Maintain data integrity

✅ **Indexes created** - Fast lookups on important fields

✅ **Public read on services only** - Other tables restricted by RLS

✅ **Admin-only management** - Service table write restricted to service role

---

**Schema Version**: v1.0 (2026-04-08)
**Format**: PostgreSQL 13+
**Status**: Ready for production
