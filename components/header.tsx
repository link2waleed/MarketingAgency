'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'glass border-b border-white/20 dark:border-white/10 py-2'
        : 'border-b border-transparent bg-transparent py-4'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold text-sm group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow">
              DM
            </div>
            <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Marketing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-primary/30 to-accent/30 text-primary font-semibold shadow-lg shadow-primary/20'
                    : 'text-foreground/70 hover:text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:block">
            <Button
              asChild
              className="bg-gradient-to-r from-destructive to-accent text-white border-0 glow-cta font-semibold shadow-lg"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mounted && isOpen && (
          <nav className="flex flex-col gap-2 glass rounded-lg p-4 mt-2 md:hidden animate-in fade-in slide-in-from-top-2 duration-300 border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-primary/40 to-accent/40 text-primary font-semibold'
                    : 'text-foreground/70 hover:text-primary hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-3 w-full bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
