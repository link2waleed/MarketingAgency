import { Star, Quote } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  rating?: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="glass rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
      
      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-accent text-accent transition-transform duration-300 group-hover:scale-110"
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
      
      {/* Quote Text */}
      <p className="mb-6 text-foreground/90 leading-relaxed text-sm flex-grow italic">
        "{quote}"
      </p>
      
      {/* Author Info */}
      <div className="border-t border-white/10 pt-4">
        <p className="font-semibold text-foreground text-sm">{author}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {role} • {company}
        </p>
      </div>

      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
