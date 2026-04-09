'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signUp, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsSubmitting(true)

    try {
      // Validation
      if (!fullName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters long')
        return
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address')
        return
      }

      await signUp(email, password, fullName)
      setSuccess(true)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error: any) {
      setError(error.message || 'Failed to sign up. Please try again.')
      console.error('Signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse delay-100" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md py-16 md:py-20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">Join our marketing agency and grow your business</p>
        </div>

        {/* Signup Card */}
        <div className="glass rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 mb-6">
          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-3"
            >
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Success Alert */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-400">Account created! Redirecting to login...</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isSubmitting || success}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isSubmitting || success}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isSubmitting || success}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isSubmitting || success}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-white/10"
                disabled={isSubmitting || success}
                required
              />
              <span className="text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:text-accent transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 h-11 font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Account Created!
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:text-accent transition-colors font-semibold">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20"
        >
          <p className="text-xs text-muted-foreground text-center">
            Your account will be created on your Supabase project once you add your credentials to .env.local
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
