import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { InteractiveTimeline } from '@/components/sections/InteractiveTimeline'
import { LeadCalculatorSection } from '@/components/sections/LeadCalculatorSection'
import { WorkflowSimulatorSection } from '@/components/sections/WorkflowSimulatorSection'
import { FoundersSection } from '@/components/sections/FoundersSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ContactSection } from '@/components/sections/ContactSection'

import servicesData from '@/content/services.json'
import faqData from '@/content/faq.json'
import testimonialsData from '@/content/testimonials.json'

import type { Service, FaqItem, Testimonial } from '@/types/content'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection services={servicesData as Service[]} />
      <InteractiveTimeline />
      <LeadCalculatorSection />
      <WorkflowSimulatorSection />
      <FoundersSection />
      <TestimonialsSection testimonials={testimonialsData as Testimonial[]} />
      <FaqSection items={faqData as FaqItem[]} />
      <PricingSection />
      <ContactSection />
    </>
  )
}
