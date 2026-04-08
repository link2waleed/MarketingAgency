'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isMounted: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Check for existing session on mount (client-side only)
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const tokenExpiry = localStorage.getItem('admin_token_expiry')
    
    if (token && tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry, 10)
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true)
      } else {
        // Token expired
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_token_expiry')
      }
    }
    setIsLoading(false)
    setIsMounted(true)
  }, [])

  const login = async (username: string, password: string) => {
    // Simple demo authentication: admin/admin
    if (username === 'admin' && password === 'admin') {
      const token = `token_${Date.now()}`
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      
      localStorage.setItem('admin_token', token)
      localStorage.setItem('admin_token_expiry', expiryTime.toString())
      
      setIsAuthenticated(true)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_token_expiry')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, isMounted }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
