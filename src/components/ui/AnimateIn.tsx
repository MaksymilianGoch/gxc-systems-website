'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  className?: string
  threshold?: number
}

export function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set data-animate client-side only → progressive enhancement
    // (content is visible by default on server, animation applied after hydration)
    el.setAttribute('data-animate', direction)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = setTimeout(() => {
            el.setAttribute('data-visible', 'true')
          }, delay)
          observer.disconnect()
          return () => clearTimeout(id)
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
