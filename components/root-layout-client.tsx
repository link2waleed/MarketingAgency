'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { DataProvider } from '@/contexts/data-context'
import { AuthProvider as SupabaseAuthProvider } from '@/contexts/auth-provider'
import { ChatbaseWidget } from '@/components/chatbase-widget'

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SupabaseAuthProvider>
        <AuthProvider>
          <DataProvider>
            {children}
            <ChatbaseWidget />
          </DataProvider>
        </AuthProvider>
      </SupabaseAuthProvider>
    </ThemeProvider>
  )
}
