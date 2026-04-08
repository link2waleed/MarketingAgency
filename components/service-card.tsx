import { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group glass rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer overflow-hidden relative h-full flex flex-col">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Box */}
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 text-primary transition-all duration-500 group-hover:from-primary/50 group-hover:to-accent/30 group-hover:shadow-lg group-hover:shadow-primary/30">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Animated border indicator */}
        <div className="mt-4 h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  )
}
