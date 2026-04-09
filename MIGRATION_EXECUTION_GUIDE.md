# Database Migration Execution Guide

## Overview

This guide explains how to execute the SQL migrations in your Supabase project to set up the complete database schema.

## What's Inside

Migration files in `supabase/migrations/`:

1. **001_create_users_profile_table.sql** - User profiles with auto-creation
2. **002_create_projects_table.sql** - Project tracking system
3. **003_create_services_table.sql** - Marketing services catalog
4. **004_seed_services_data.sql** - Sample service data

## Prerequisites

- Your Supabase project is created
- You have access to Supabase Dashboard
- Your project has:
  - Auth enabled (already enabled during login setup)
  - PostgreSQL database (default)
  - RLS enabled on tables (recommended)

## Method 1: Supabase Dashboard (Easy)

### Steps:

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the content of **001_create_users_profile_table.sql**
6. Click **Run**
7. Verify: Check **Tables** section - should see `user_profiles` with all columns

### Repeat for Other Migrations:
- Create new query for each migration file
- Run in order: 001 → 002 → 003 → 004
- Wait for each to complete before starting next

### Expected Results:

After each migration, you should see in the **Tables** section:
- ✅ 001: `user_profiles` table with 11 columns
- ✅ 002: `projects` table with 13 columns  
- ✅ 003: `services` table with 16 columns
- ✅ 004: 6 sample services in the services table

## Method 2: Supabase CLI (Recommended)

### Setup:

1. Install Supabase CLI:
```bash
brew install supabase/tap/supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref YOUR_PROJECT_ID
```
(Find PROJECT_ID in Supabase Dashboard > Settings > General)

### Execute Migrations:

```bash
# Run all migrations in order
supabase db push
```

This automatically runs all SQL files in `supabase/migrations/` in numbered order.

### Verify:

```bash
# Check which migrations have been applied
supabase migration list
```

## Method 3: psql (For Advanced Users)

If you have PostgreSQL client installed:

1. Get your connection string from Supabase:
   - Dashboard > Settings > Database > Connection string > Postgres
   - Use the full connection string (starts with `postgres://`)

2. Run migrations:
```bash
psql "YOUR_CONNECTION_STRING" < supabase/migrations/001_create_users_profile_table.sql
psql "YOUR_CONNECTION_STRING" < supabase/migrations/002_create_projects_table.sql
psql "YOUR_CONNECTION_STRING" < supabase/migrations/003_create_services_table.sql
psql "YOUR_CONNECTION_STRING" < supabase/migrations/004_seed_services_data.sql
```

## Verification Checklist

After running all migrations, verify in Supabase Dashboard:

### Tables Created:
- [ ] `user_profiles` - exists and has correct columns
- [ ] `projects` - exists and has correct columns
- [ ] `services` - exists and has correct columns

### Sample Data:
- [ ] `services` table contains 6 services (Social Media, Paid Ads, SEO, Web Dev, Branding, Analytics)

### Functions Created:
- [ ] `handle_new_user()` function exists (run: `SELECT * FROM information_schema.routines WHERE routine_name = 'handle_new_user'`)

### Triggers Created:
- [ ] `on_auth_user_created` trigger on `auth.users` table
- [ ] `update_*_updated_at_column` trigger on each table

### Test Auto-Creation:

1. Go to **Authentication > Users** in Supabase Dashboard
2. Create a test user manually (or sign up via your app)
3. Go to **SQL Editor** and run:
```sql
SELECT * FROM public.user_profiles WHERE email = 'test@example.com';
```
4. **Expected**: Profile automatically created for the new user ✅

## Troubleshooting

### Error: "relation does not exist"
- Ensure migrations ran in correct order (001 → 002 → 003 → 004)
- Check tables exist: Run `\dt` in SQL Editor
- Verify `auth.users` is available (built-in Supabase auth table)

### Error: "permission denied"
- Make sure you're logged in as project owner/admin
- RLS policies should allow your operations (check Supabase > Auth > Policies)

### Services table empty?
- Run 004_seed_services_data.sql again
- Check for ON CONFLICT clause (prevents duplicates)

### Profile not auto-creating on signup?
- Verify `on_auth_user_created` trigger exists
- Check `handle_new_user()` function exists
- Make sure trigger is AFTER INSERT (not BEFORE)

## What Each Migration Does

### 001 - User Profiles
- **Purpose**: Extend Supabase auth with additional user information
- **Auto-Creates**: Profile automatically when user signs up
- **Enables**: Storing company name, phone, avatar, timezone, etc.
- **Security**: RLS policies ensure users only see their own profile

### 002 - Projects
- **Purpose**: Track marketing projects per user
- **Relations**: Each project belongs to one user
- **Fields**: Status (planning/in-progress/completed), budget tracking, timeline
- **Security**: RLS ensures users only see their own projects

### 003 - Services  
- **Purpose**: Catalog of marketing services offered
- **Access**: Public read (everyone sees services), admin write only
- **Flexible**: JSONB fields for features and benefits (expandable without migration)

### 004 - Services Seed Data
- **Purpose**: Populate services table with example data
- **Services**: 6 pre-configured marketing services with pricing and features
- **Safe**: Uses `ON CONFLICT DO NOTHING` to prevent duplicate errors

## Next Steps

1. ✅ **Run migrations** (this guide)
2. ✅ **Test user creation** (verify auto-profile creation)
3. **Update Auth Pages** (optional):
   - Add company_name field to signup form
   - Create profile management page
   - Add services dashboard

4. **Create Additional Tables** (if needed):
   - Orders/purchases table
   - Case studies table
   - Testimonials table
   - FAQ table

## Quick Reference

| File | Creates | Records | Purpose |
|------|---------|---------|---------|
| 001 | user_profiles | - | User info storage + auto-creation |
| 002 | projects | - | Project tracking |
| 003 | services | - | Service catalog |
| 004 | - | 6 | Sample marketing services |

## Environment Variables

Your app already has:
- `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

These match the migrations. No additional setup needed.

## Support

If migrations fail:
1. Check [Supabase Status](https://status.supabase.com)
2. Review error message in SQL Editor
3. Try running smaller sections of the migration file
4. Check Supabase docs: https://supabase.com/docs/guides/database

---

**Ready?** Choose Method 1 (Dashboard) or Method 2 (CLI) above and execute your migrations!
