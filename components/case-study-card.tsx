import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
  title: string
  company: string
  category: string
  result: string
  href: string
  imagePlaceholder?: string
}

export function CaseStudyCard({
  title,
  company,
  category,
  result,
  href,
}: CaseStudyCardProps) {
  const categoryColors: { [key: string]: string } = {
    'E-Commerce': 'from-blue-500 to-cyan-500',
    'SaaS': 'from-purple-500 to-pink-500',
    'Startup': 'from-green-500 to-teal-500',
    'Enterprise': 'from-orange-500 to-red-500',
    default: 'from-primary to-accent'
  }

  const gradientClass = categoryColors[category] || categoryColors['default']

  return (
    <Link href={href} className="group block h-full">
      <div className="relative glass rounded-2xl overflow-hidden bg-card transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
        {/* Image Placeholder with Gradient */}
        <div className={`relative h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 text-center px-4">
            <p className="text-sm font-bold text-white mb-2 opacity-90">{category}</p>
            <p className="text-xl font-bold text-white">{company}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="mb-3 font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed flex-grow">
            {result}
          </p>
          
          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-destructive group-hover:text-accent transition-colors duration-300">
            View Case Study
            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  )
}
