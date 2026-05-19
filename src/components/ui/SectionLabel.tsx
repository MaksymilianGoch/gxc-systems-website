interface SectionLabelProps {
  children: string
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  return (
    <p
      className={`accent-rule text-eyebrow ${light ? 'text-amber!' : 'text-teal'} ${className}`}
    >
      {children}
    </p>
  )
}
