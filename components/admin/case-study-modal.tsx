'use client'

import { useState, useEffect } from 'react'
import { CaseStudy } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<CaseStudy, 'id'>) => void
  initialData?: CaseStudy
}

export function CaseStudyModal({ isOpen, onClose, onSubmit, initialData }: CaseStudyModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [challenge, setChallenge] = useState('')
  const [solution, setSolution] = useState('')
  const [results, setResults] = useState<string[]>([''])
  const [image, setImage] = useState('')
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setCategory(initialData.category)
      setDescription(initialData.description)
      setChallenge(initialData.challenge)
      setSolution(initialData.solution)
      setResults(initialData.results)
      setImage(initialData.image)
      setFeatured(initialData.featured)
    } else {
      setTitle('')
      setCategory('')
      setDescription('')
      setChallenge('')
      setSolution('')
      setResults([''])
      setImage('')
      setFeatured(false)
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleResultChange = (index: number, value: string) => {
    const newResults = [...results]
    newResults[index] = value
    setResults(newResults)
  }

  const addResult = () => {
    setResults([...results, ''])
  }

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredResults = results.filter(r => r.trim())
    onSubmit({
      title,
      category,
      description,
      challenge,
      solution,
      results: filteredResults,
      image,
      featured,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Case Study' : 'Add Case Study'}
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
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Case study title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., E-Commerce, SaaS"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Challenge</label>
            <textarea
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="The challenge faced"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Solution</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="The solution implemented"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Results</label>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={result}
                    onChange={(e) => handleResultChange(index, e.target.value)}
                    placeholder={`Result ${index + 1}`}
                  />
                  {results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResult(index)}
                      className="px-2 py-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addResult}
              className="mt-2 text-sm text-primary hover:underline"
            >
              + Add Result
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image (2 letters)</label>
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="e.g., EC"
              maxLength={2}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Mark as featured
            </label>
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
              {initialData ? 'Update' : 'Add'} Case Study
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
