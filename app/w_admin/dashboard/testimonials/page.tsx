'use client'

import { useState } from 'react'
import { useData, type Testimonial } from '@/contexts/data-context'
import { DataTable, type Column } from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import { TestimonialModal } from '@/components/admin/testimonial-modal'
import { DeleteConfirmation } from '@/components/admin/delete-confirmation'
import { Plus } from 'lucide-react'

export default function TestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null)

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const handleDelete = (testimonial: Testimonial) => {
    setDeletingTestimonial(testimonial)
  }

  const handleConfirmDelete = () => {
    if (deletingTestimonial) {
      deleteTestimonial(deletingTestimonial.id)
      setDeletingTestimonial(null)
    }
  }

  const handleSubmit = (data: Omit<Testimonial, 'id'>) => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, data)
    } else {
      addTestimonial(data)
    }
    setIsModalOpen(false)
    setEditingTestimonial(null)
  }

  const columns: Column<Testimonial>[] = [
    { key: 'name', label: 'Name' },
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    {
      key: 'content',
      label: 'Content',
      render: (value) => <div className="max-w-xs truncate">{value}</div>,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="mt-2 text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button
          onClick={() => {
            setEditingTestimonial(null)
            setIsModalOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <DataTable
        data={testimonials}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTestimonial(null)
        }}
        onSubmit={handleSubmit}
        initialData={editingTestimonial || undefined}
      />

      <DeleteConfirmation
        isOpen={!!deletingTestimonial}
        title="Delete Testimonial"
        description={`Are you sure you want to delete the testimonial from "${deletingTestimonial?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTestimonial(null)}
      />
    </div>
  )
}
