import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`max-w-6xl mx-auto px-6 md:px-8 lg:px-12 ${className}`}>{children}</Tag>
  )
}
