# Using Authentication in Your Components

This guide shows practical examples of how to use the `useAuth()` hook in your components.

## Basic Usage Pattern

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'

export function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  
  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  // Show different content based on auth status
  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }
  
  return <div>Welcome, {user?.email}!</div>
}
```

---

## Example 1: Display User Info in Header

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="flex justify-between items-center">
      <h1>My Site</h1>
      
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          
          <Button 
            onClick={() => signOut()}
            variant="outline"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </header>
  )
}
```

---

## Example 2: Protect a Page from Unauthorized Access

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Prevents flash of content
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content here */}
    </div>
  )
}
```

---

## Example 3: Show Different UI Based on Auth Status

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AnonymousSection() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="py-8">
      {isAuthenticated ? (
        <div className="glass rounded-xl p-6">
          <h2>Welcome Back!</h2>
          <p>You have full access to all features.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2>Sign in to get started</h2>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
```

---

## Example 4: Custom Hook for Protected Data

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { useEffect, useState } from 'react'

export function useUserData() {
  const { user, isAuthenticated } = useAuth()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user) return

    setIsLoading(true)
    
    // Fetch user-specific data
    fetch(`/api/user/${user.id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .finally(() => setIsLoading(false))
  }, [user, isAuthenticated])

  return { data, isLoading, isAuthenticated }
}

// Usage:
export function UserProfile() {
  const { data, isLoading } = useUserData()
  
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data</div>
  
  return <div>{data.name}</div>
}
```

---

## Example 5: Add Sign Out to Navigation

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function NavMenu() {
  const { isAuthenticated, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="space-y-2">
      <a href="/" className="block p-2">Home</a>
      <a href="/about" className="block p-2">About</a>
      
      {isAuthenticated && (
        <>
          <a href="/dashboard" className="block p-2">Dashboard</a>
          <button
            onClick={handleSignOut}
            className="block w-full text-left p-2 text-destructive hover:bg-destructive/10 rounded"
          >
            <LogOut className="h-4 w-4 inline mr-2" />
            Sign Out
          </button>
        </>
      )}
    </nav>
  )
}
```

---

## Example 6: Conditional API Calls

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { useState } from 'react'

export function SaveFavorite({ itemId }: { itemId: string }) {
  const { isAuthenticated, user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/auth/login'
      return
    }

    setIsSaving(true)
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          itemId,
        }),
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <button 
      onClick={handleSave}
      disabled={isSaving}
    >
      {isSaving ? 'Saving...' : 'Save'}
    </button>
  )
}
```

---

## Example 7: Complete User Account Component

```typescript
'use client'

import { useAuth } from '@/contexts/auth-provider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings } from 'lucide-react'

export function UserAccount() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div>
        <Button onClick={() => router.push('/auth/login')}>
          Sign In
        </Button>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="glass rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-semibold">{user?.email}</p>
          <p className="text-xs text-muted-foreground">
            Joined {new Date(user?.created_at || '').toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => router.push('/account/settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
```

---

## Available Auth Properties

```typescript
const {
  // Current user object
  user,              // User | null
  
  // Auth state
  isAuthenticated,   // boolean
  isLoading,        // boolean
  
  // Auth functions
  signUp,           // (email, password, fullName) => Promise
  signIn,           // (email, password) => Promise
  signOut,          // () => Promise
} = useAuth()
```

### User Object Properties
```typescript
user?.id          // Unique user ID
user?.email       // User's email
user?.created_at  // Account creation date
user?.user_metadata // Custom data you set
```

---

## Common Patterns

### Pattern 1: Loading User-Specific Data
```typescript
const { user, isAuthenticated } = useAuth()

useEffect(() => {
  if (!isAuthenticated) return
  
  // Fetch user-specific data
  fetchUserData(user?.id)
}, [user, isAuthenticated])
```

### Pattern 2: Redirect Unauthenticated Users
```typescript
useEffect(() => {
  if (!isLoading && !isAuthenticated) {
    router.push('/auth/login')
  }
}, [isLoading, isAuthenticated, router])
```

### Pattern 3: Show Loading State
```typescript
if (isLoading) {
  return <LoadingSpinner />
}
```

### Pattern 4: Check Before Action
```typescript
const handleDelete = async (id: string) => {
  if (!isAuthenticated) {
    router.push('/auth/login')
    return
  }
  
  // Proceed with deletion
  await deleteItem(id)
}
```

---

## Tips & Best Practices

✅ **Do:**
- Always check `isLoading` before checking `isAuthenticated`
- Wrap auth checks in `useEffect` for client-side redirects
- Use `isAuthenticated` to show/hide UI
- Handle errors from `signUp`, `signIn`, `signOut`

❌ **Don't:**
- Use auth in server components (they don't have access to browser)
- Skip `isLoading` check (causes flash of wrong content)
- Store sensitive data in component state
- Redirect before checking `isLoading`

---

## Questions?

See the full setup guide: **SUPABASE_SETUP_GUIDE.md**
