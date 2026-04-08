'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading, isMounted } = useAuth()

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/w_admin')
    }
  }, [isAuthenticated, isMounted, router])

  if (!isMounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent glow animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-foreground">Loading...</div>
          <p className="text-muted-foreground mt-2">Authenticating your session</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  )
}
