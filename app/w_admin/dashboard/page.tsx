'use client'

import { useData } from '@/contexts/data-context'
import { Briefcase, MessageSquare, FileText, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const { services, testimonials, caseStudies } = useData()

  const stats = [
    {
      label: 'Total Services',
      value: services.length,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Case Studies',
      value: caseStudies.length,
      icon: FileText,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Featured Case Studies',
      value: caseStudies.filter(c => c.featured).length,
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your admin dashboard. Manage your content below.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass rounded-xl p-6 border border-white/10 bg-white/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Stats</h2>
        <div className="glass rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Service Benefits</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {services.map((service) => (
                  <div key={service.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="text-lg mt-1">{service.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{service.title}</p>
                      <p>{service.benefits.length} benefits</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Case Study Categories</h3>
              <div className="space-y-2 text-sm">
                {Array.from(new Set(caseStudies.map(c => c.category))).map((category) => {
                  const count = caseStudies.filter(c => c.category === category).length
                  return (
                    <div key={category} className="flex justify-between items-center p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <span className="text-foreground">{category}</span>
                      <span className="font-semibold text-primary bg-white/10 px-2 py-1 rounded">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Latest Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div key={testimonial.id} className="glass rounded-xl p-6 border border-white/10 bg-white/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <p className="text-sm text-muted-foreground italic mb-4">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
