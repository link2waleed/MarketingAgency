# Supabase Authentication Setup Guide

## Overview
Your Marketing Agency app now has complete authentication with Supabase! Follow this guide to connect your real Supabase project.

## Quick Links
- **Supabase Dashboard**: https://app.supabase.com
- **Login Page**: http://localhost:3000/auth/login
- **Signup Page**: http://localhost:3000/auth/signup

---

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"** or **"New"**
3. Fill in the project details:
   - **Name**: Your project name (e.g., "MarketingAgency")
   - **Database Password**: Create a strong password (save it securely!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is fine for testing
4. Click **"Create new project"**
5. Wait for the project to be initialized (2-3 minutes)

---

## Step 2: Get Your Credentials

Once your project is ready, follow these steps:

### Find Your Project URL:
1. In the Supabase Dashboard, go to **Settings** → **API**
2. Copy the **"Project URL"**
   - It looks like: `https://your-project-id.supabase.co`
3. This is your `NEXT_PUBLIC_SUPABASE_URL`

### Find Your Anon Key:
1. Still in **Settings** → **API**
2. Copy the **"anon public"** key (it's the public key, safe to share)
3. This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 3: Update Your Credentials

Open the `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### Replace with your actual values:

**Before:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

**After (Example):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijkl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 4: Configure Email Authentication (Optional but Recommended)

To enable email confirmations:

1. Go to **Authentication** → **Providers** in Supabase Dashboard
2. Make sure **Email** is enabled (it should be by default)
3. Go to **Authentication** → **Email Templates**
4. Customize email templates if desired

---

## Step 5: Test the Authentication

### Restart Your Dev Server:
```bash
# Kill existing dev server
lsof -ti:3000 | xargs kill -9

# Restart dev server
npm run dev
```

### Test Signup:
1. Navigate to http://localhost:3000/auth/signup
2. Fill in:
   - Full Name: "John Doe"
   - Email: "test@example.com"
   - Password: "Password123" (min 8 characters)
   - Confirm Password: "Password123"
3. Click **"Create Account"**
4. You should see a success message

### Verify in Supabase:
1. Go to Supabase Dashboard
2. Click **Authentication** → **Users**
3. You should see your new user listed!

### Test Login:
1. Navigate to http://localhost:3000/auth/login
2. Use the credentials you just created
3. You should be logged in and redirected

---

## Step 6: Protect Routes (Optional)

To protect pages and require authentication, create a middleware:

```typescript
// middleware.ts (in project root)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect to login if accessing protected routes without session
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
```

---

## Step 7: Using Auth in Your Components

### Access User Info:
```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'

export function MyComponent() {
  const { user, signOut, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Sign Out Button:
```typescript
import { useAuth } from '@/contexts/auth-provider'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const { signOut } = useAuth()

  return (
    <Button onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
```

---

## File Structure

Here's what was created:

```
├── .env.local                          # Your Supabase credentials
├── lib/
│   └── supabase.ts                    # Supabase client setup
├── contexts/
│   └── auth-provider.tsx              # Auth state management
└── app/
    └── auth/
        ├── login/
        │   └── page.tsx               # Login page
        └── signup/
            └── page.tsx               # Signup page
```

---

## Troubleshooting

### "Missing Supabase credentials" Error:
- Check that `.env.local` exists in your project root
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart your dev server after updating `.env.local`

### "Invalid login" Error:
- Make sure your user was actually created (check Supabase Dashboard)
- Verify password is at least 8 characters
- Check email format is valid

### User Not Found After Signup:
- Wait a few seconds, then refresh
- Check Supabase Dashboard → Authentication → Users
- Verify you're using the same Supabase URL and key

### CORS Errors:
- This usually means the credentials are wrong
- Double-check your SUPABASE_URL format
- Make sure you're using the "anon public" key, not the service role key

---

## Security Notes

⚠️ **Important:**
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public (prefixed with `NEXT_PUBLIC_`)
- This is intentional - these are meant to be public keys
- Never expose your **Service Role Key** - that's private!
- Never commit `.env.local` to git - add it to `.gitignore`

---

## Next Steps

1. ✅ Add your Supabase credentials to `.env.local`
2. ✅ Test login and signup pages
3. ✅ Create a sign-out button in your header
4. ✅ Add user profile pages
5. ✅ Connect authentication to your admin panel

---

## Support

For more information:
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [NextJS with Supabase](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Supabase Community](https://discord.supabase.com)

---

**Ready?** Go to https://app.supabase.com and create your project now! 🚀
