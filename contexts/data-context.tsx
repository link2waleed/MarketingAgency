'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  benefits: string[]
  price: number
  billingPeriod: 'month' | 'year'
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  image: string
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string[]
  image: string
  featured: boolean
}

interface DataContextType {
  services: Service[]
  testimonials: Testimonial[]
  caseStudies: CaseStudy[]
  
  // Services
  addService: (service: Omit<Service, 'id'>) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  
  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void
  
  // Case Studies
  addCaseStudy: (caseStudy: Omit<CaseStudy, 'id'>) => void
  updateCaseStudy: (id: string, caseStudy: Partial<CaseStudy>) => void
  deleteCaseStudy: (id: string) => void
  
  // Data
  resetData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const SEED_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Social Media Marketing',
    description: 'Grow your audience and engage your community across all major platforms.',
    icon: '📱',
    benefits: ['Increased engagement', 'Brand awareness', 'Community growth'],
    price: 2999,
    billingPeriod: 'month',
    features: ['Content calendar management', 'Daily posting & engagement', 'Community moderation', 'Monthly analytics report', 'Influencer outreach', '24/7 customer support'],
  },
  {
    id: '2',
    title: 'Paid Advertising',
    description: 'Strategic ad campaigns that drive qualified leads and conversions.',
    icon: '📊',
    benefits: ['Targeted reach', 'Higher ROI', 'Conversion optimization'],
    price: 4999,
    billingPeriod: 'month',
    features: ['Google Ads management', 'Facebook/Instagram ads', 'LinkedIn campaigns', 'Daily optimization', 'A/B testing', 'Performance tracking'],
  },
  {
    id: '3',
    title: 'SEO Optimization',
    description: 'Improve your search rankings and organic traffic with proven strategies.',
    icon: '🔍',
    benefits: ['Organic traffic', 'Higher rankings', 'Long-term visibility'],
    price: 3499,
    billingPeriod: 'month',
    features: ['Technical SEO audit', 'Keyword research', 'Content optimization', 'Link building', 'Monthly reports', 'Competitive analysis'],
  },
]

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    role: 'Marketing Director',
    content: 'The team transformed our marketing strategy and increased our leads by 300%. Exceptional results!',
    image: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'E-Commerce Plus',
    role: 'CEO',
    content: 'Professional, creative, and results-driven. They really understand our business and delivered beyond expectations.',
    image: 'MC',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'Design Co.',
    role: 'Founder',
    content: 'Outstanding service and measurable results. Our ROI improved significantly within the first quarter.',
    image: 'ER',
  },
]

const SEED_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'E-Commerce Transformation',
    category: 'E-Commerce',
    description: 'How we helped an online retailer increase sales by 250% through comprehensive digital marketing.',
    challenge: 'Low online visibility and inconsistent sales growth despite quality products.',
    solution: 'Implemented integrated social media strategy, PPC campaigns, and SEO optimization.',
    results: ['250% sales increase', '150% traffic growth', '45% conversion rate improvement'],
    image: 'EC',
    featured: true,
  },
  {
    id: '2',
    title: 'SaaS Growth Campaign',
    category: 'SaaS',
    description: 'Strategic marketing approach that scaled a B2B SaaS platform from 100 to 1000+ customers.',
    challenge: 'Limited brand awareness in a competitive market with tight budget constraints.',
    solution: 'Content marketing, targeted LinkedIn campaigns, and partnership strategy.',
    results: ['10x customer growth', '85% CAC reduction', '$2M ARR achieved'],
    image: 'SA',
    featured: true,
  },
]

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>(SEED_SERVICES)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(SEED_TESTIMONIALS)
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(SEED_CASE_STUDIES)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem('admin_services')
    const savedTestimonials = localStorage.getItem('admin_testimonials')
    const savedCaseStudies = localStorage.getItem('admin_case_studies')

    if (savedServices) {
      setServices(JSON.parse(savedServices))
    } else {
      setServices(SEED_SERVICES)
      localStorage.setItem('admin_services', JSON.stringify(SEED_SERVICES))
    }

    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials))
    } else {
      setTestimonials(SEED_TESTIMONIALS)
      localStorage.setItem('admin_testimonials', JSON.stringify(SEED_TESTIMONIALS))
    }

    if (savedCaseStudies) {
      setCaseStudies(JSON.parse(savedCaseStudies))
    } else {
      setCaseStudies(SEED_CASE_STUDIES)
      localStorage.setItem('admin_case_studies', JSON.stringify(SEED_CASE_STUDIES))
    }
  }, [])

  // Services
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() }
    const updated = [...services, newService]
    setServices(updated)
    localStorage.setItem('admin_services', JSON.stringify(updated))
  }

  const updateService = (id: string, updates: Partial<Service>) => {
    const updated = services.map(s => s.id === id ? { ...s, ...updates } : s)
    setServices(updated)
    localStorage.setItem('admin_services', JSON.stringify(updated))
  }

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id)
    setServices(updated)
    localStorage.setItem('admin_services', JSON.stringify(updated))
  }

  // Testimonials
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: Date.now().toString() }
    const updated = [...testimonials, newTestimonial]
    setTestimonials(updated)
    localStorage.setItem('admin_testimonials', JSON.stringify(updated))
  }

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, ...updates } : t)
    setTestimonials(updated)
    localStorage.setItem('admin_testimonials', JSON.stringify(updated))
  }

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id)
    setTestimonials(updated)
    localStorage.setItem('admin_testimonials', JSON.stringify(updated))
  }

  // Case Studies
  const addCaseStudy = (caseStudy: Omit<CaseStudy, 'id'>) => {
    const newCaseStudy = { ...caseStudy, id: Date.now().toString() }
    const updated = [...caseStudies, newCaseStudy]
    setCaseStudies(updated)
    localStorage.setItem('admin_case_studies', JSON.stringify(updated))
  }

  const updateCaseStudy = (id: string, updates: Partial<CaseStudy>) => {
    const updated = caseStudies.map(c => c.id === id ? { ...c, ...updates } : c)
    setCaseStudies(updated)
    localStorage.setItem('admin_case_studies', JSON.stringify(updated))
  }

  const deleteCaseStudy = (id: string) => {
    const updated = caseStudies.filter(c => c.id !== id)
    setCaseStudies(updated)
    localStorage.setItem('admin_case_studies', JSON.stringify(updated))
  }

  const resetData = () => {
    setServices(SEED_SERVICES)
    setTestimonials(SEED_TESTIMONIALS)
    setCaseStudies(SEED_CASE_STUDIES)
    localStorage.setItem('admin_services', JSON.stringify(SEED_SERVICES))
    localStorage.setItem('admin_testimonials', JSON.stringify(SEED_TESTIMONIALS))
    localStorage.setItem('admin_case_studies', JSON.stringify(SEED_CASE_STUDIES))
  }

  return (
    <DataContext.Provider
      value={{
        services,
        testimonials,
        caseStudies,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
