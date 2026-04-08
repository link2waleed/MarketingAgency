'use client'

import { useState } from 'react'
import { useData, type CaseStudy } from '@/contexts/data-context'
import { DataTable, type Column } from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import { CaseStudyModal } from '@/components/admin/case-study-modal'
import { DeleteConfirmation } from '@/components/admin/delete-confirmation'
import { Plus } from 'lucide-react'

export default function CaseStudiesPage() {
  const { caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null)
  const [deletingCaseStudy, setDeletingCaseStudy] = useState<CaseStudy | null>(null)

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy)
    setIsModalOpen(true)
  }

  const handleDelete = (caseStudy: CaseStudy) => {
    setDeletingCaseStudy(caseStudy)
  }

  const handleConfirmDelete = () => {
    if (deletingCaseStudy) {
      deleteCaseStudy(deletingCaseStudy.id)
      setDeletingCaseStudy(null)
    }
  }

  const handleSubmit = (data: Omit<CaseStudy, 'id'>) => {
    if (editingCaseStudy) {
      updateCaseStudy(editingCaseStudy.id, data)
    } else {
      addCaseStudy(data)
    }
    setIsModalOpen(false)
    setEditingCaseStudy(null)
  }

  const columns: Column<CaseStudy>[] = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'results',
      label: 'Results',
      render: (value) => <div className="text-sm text-muted-foreground">{(value as string[]).length} items</div>,
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (value) => <div className="text-sm">{value ? '✓ Featured' : 'Not featured'}</div>,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Case Studies Management</h1>
          <p className="mt-2 text-muted-foreground">Manage your case studies and success stories</p>
        </div>
        <Button
          onClick={() => {
            setEditingCaseStudy(null)
            setIsModalOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      <DataTable
        data={caseStudies}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCaseStudy(null)
        }}
        onSubmit={handleSubmit}
        initialData={editingCaseStudy || undefined}
      />

      <DeleteConfirmation
        isOpen={!!deletingCaseStudy}
        title="Delete Case Study"
        description={`Are you sure you want to delete "${deletingCaseStudy?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingCaseStudy(null)}
      />
    </div>
  )
}
