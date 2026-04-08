'use client'

import { useState } from 'react'
import { useData, type Service } from '@/contexts/data-context'
import { DataTable, type Column } from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import { ServiceModal } from '@/components/admin/service-modal'
import { DeleteConfirmation } from '@/components/admin/delete-confirmation'
import { Plus } from 'lucide-react'

export default function ServicesPage() {
  const { services, addService, updateService, deleteService } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deletingService, setDeletingService] = useState<Service | null>(null)

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleDelete = (service: Service) => {
    setDeletingService(service)
  }

  const handleConfirmDelete = () => {
    if (deletingService) {
      deleteService(deletingService.id)
      setDeletingService(null)
    }
  }

  const handleSubmit = (data: Omit<Service, 'id'>) => {
    if (editingService) {
      updateService(editingService.id, data)
    } else {
      addService(data)
    }
    setIsModalOpen(false)
    setEditingService(null)
  }

  const columns: Column<Service>[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'description',
      label: 'Description',
      render: (value) => <div className="max-w-xs truncate">{value}</div>,
    },
    { key: 'icon', label: 'Icon' },
    {
      key: 'benefits',
      label: 'Benefits',
      render: (value) => <div className="text-sm text-muted-foreground">{(value as string[]).length} items</div>,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="mt-2 text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button
          onClick={() => {
            setEditingService(null)
            setIsModalOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingService(null)
        }}
        onSubmit={handleSubmit}
        initialData={editingService || undefined}
      />

      <DeleteConfirmation
        isOpen={!!deletingService}
        title="Delete Service"
        description={`Are you sure you want to delete "${deletingService?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingService(null)}
      />
    </div>
  )
}
