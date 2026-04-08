'use client'

import { useState, useEffect } from 'react'
import { Testimonial } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface TestimonialModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Testimonial, 'id'>) => void
  initialData?: Testimonial
}

export function TestimonialModal({ isOpen, onClose, onSubmit, initialData }: TestimonialModalProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setCompany(initialData.company)
      setRole(initialData.role)
      setContent(initialData.content)
      setImage(initialData.image)
    } else {
      setName('')
      setCompany('')
      setRole('')
      setContent('')
      setImage('')
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      company,
      role,
      content,
      image,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Job title/role"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Testimonial</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Testimonial text"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Avatar (2 letters)</label>
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="e.g., SJ"
              maxLength={2}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-muted text-foreground hover:bg-muted/80"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {initialData ? 'Update' : 'Add'} Testimonial
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
