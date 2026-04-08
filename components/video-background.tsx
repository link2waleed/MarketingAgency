interface VideoBackgroundProps {
  src?: string
  poster?: string
  children: React.ReactNode
  overlay?: 'gradient' | 'dark' | 'light' | 'none'
  overlayIntensity?: 'light' | 'medium' | 'strong'
}

export function VideoBackground({
  src,
  poster,
  children,
  overlay = 'gradient',
  overlayIntensity = 'medium',
}: VideoBackgroundProps) {
  const overlayClasses = {
    gradient: {
      light: 'from-background/20 via-background/40 to-background/60',
      medium: 'from-background/40 via-background/60 to-background/80',
      strong: 'from-background/60 via-background/80 to-background/95',
    },
    dark: {
      light: 'from-black/20 via-black/40 to-black/60',
      medium: 'from-black/40 via-black/60 to-black/80',
      strong: 'from-black/60 via-black/80 to-black/95',
    },
    light: {
      light: 'from-white/20 via-white/40 to-white/60',
      medium: 'from-white/40 via-white/60 to-white/80',
      strong: 'from-white/60 via-white/80 to-white/95',
    },
  }

  const overlayClass = overlay === 'none' ? '' : `bg-gradient-to-b ${overlayClasses[overlay][overlayIntensity]}`

  return (
    <div className="relative overflow-hidden">
      {/* Video Background */}
      {src ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
