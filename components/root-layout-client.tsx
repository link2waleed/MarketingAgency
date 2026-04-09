'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { DataProvider } from '@/contexts/data-context'
import { ChatBotProvider } from '@/contexts/chatbot-context'
import { AuthProvider as SupabaseAuthProvider } from '@/contexts/auth-provider'
import { ChatBot } from '@/components/chatbot'

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SupabaseAuthProvider>
        <AuthProvider>
          <DataProvider>
            <ChatBotProvider>
              {children}
              <ChatBot />
            </ChatBotProvider>
          </DataProvider>
        </AuthProvider>
      </SupabaseAuthProvider>
    </ThemeProvider>
  )
}
