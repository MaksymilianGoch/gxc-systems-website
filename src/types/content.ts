export interface Service {
  id: string
  title: string
  tagline: string
  description: string
  benefits: string[]
  icon: 'Zap' | 'Calendar' | 'Globe' | 'MessageSquare'
  priceFrom: number
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string
  rating: number
  projectType: string
}
