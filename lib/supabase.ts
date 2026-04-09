import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client with fallback for build time - will throw error at runtime if not configured
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Validate credentials at runtime when actually needed
export function validateSupabaseCredentials() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials. Please check your .env.local file.')
  }
}
