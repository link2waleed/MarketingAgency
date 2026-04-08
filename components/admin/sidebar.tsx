'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { LogOut, LayoutDashboard, Briefcase, MessageSquare, FileText, Settings } from 'lucide-react'

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { href: '/w_admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/w_admin/dashboard/services', label: 'Services', icon: Briefcase },
    { href: '/w_admin/dashboard/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/w_admin/dashboard/case-studies', label: 'Case Studies', icon: FileText },
    { href: '/w_admin/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push('/w_admin')
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-white/10 via-white/5 to-white/5 border-r border-white/10 glass backdrop-blur-xl">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold text-sm glow">
            DM
          </div>
          <span className="font-semibold text-foreground">Admin</span>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'glass bg-gradient-to-r from-primary/40 to-accent/30 text-primary border border-white/10 shadow-lg shadow-primary/20'
                  : 'text-foreground/80 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <Button
          onClick={handleLogout}
          className="w-full justify-start gap-2 bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30 font-semibold"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
