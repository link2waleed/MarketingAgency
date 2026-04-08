'use client'

import { useState } from 'react'
import { useData } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RotateCcw, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const { resetData, services, testimonials, caseStudies } = useData()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleReset = () => {
    resetData()
    setShowResetConfirm(false)
    setResetSuccess(true)
    setTimeout(() => setResetSuccess(false), 3000)
  }

  const totalItems = services.length + testimonials.length + caseStudies.length

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage admin settings and data</p>
      </div>

      {resetSuccess && (
        <div className="rounded-lg bg-green-100 p-4 text-sm text-green-800">
          Data has been reset to default values successfully.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Data Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Data Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <span className="text-sm">Total Services</span>
              <span className="font-semibold text-primary">{services.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <span className="text-sm">Total Testimonials</span>
              <span className="font-semibold text-primary">{testimonials.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <span className="text-sm">Total Case Studies</span>
              <span className="font-semibold text-primary">{caseStudies.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
              <span className="text-sm font-medium">Total Items</span>
              <span className="font-bold text-primary">{totalItems}</span>
            </div>
          </div>
        </Card>

        {/* Export Data */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Export Data</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Download your current data as a JSON file for backup purposes.
          </p>
          <Button
            onClick={() => {
              const data = {
                services,
                testimonials,
                caseStudies,
                exportedAt: new Date().toISOString(),
              }
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `admin-data-${new Date().toISOString().split('T')[0]}.json`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Download Data
          </Button>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-destructive/10 p-3">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Reset all data to default values. This action cannot be undone.
            </p>

            {showResetConfirm ? (
              <div className="space-y-3">
                <p className="text-sm font-medium">Are you sure? This will:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Delete all custom services, testimonials, and case studies</li>
                  <li>Restore default seed data</li>
                  <li>Cannot be undone</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-muted text-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Confirm Reset
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowResetConfirm(true)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default Data
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Information */}
      <Card className="p-6 bg-muted/50">
        <h2 className="text-lg font-bold mb-3">Information</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• All data is stored locally in your browser using localStorage</li>
          <li>• Changes are saved automatically</li>
          <li>• Clearing browser data will delete all your custom content</li>
          <li>• Use the Export feature to backup your data regularly</li>
          <li>• Demo credentials: username: <code className="font-mono text-foreground">admin</code>, password: <code className="font-mono text-foreground">admin</code></li>
        </ul>
      </Card>
    </div>
  )
}
