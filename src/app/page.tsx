import { HeroSection } from '@/components/sections/HeroSection'
import { CostSection } from '@/components/sections/CostSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { InteractiveTimeline } from '@/components/sections/InteractiveTimeline'
import { LeadCalculatorSection } from '@/components/sections/LeadCalculatorSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { FoundersSection } from '@/components/sections/FoundersSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ContactSection } from '@/components/sections/ContactSection'

import faqData from '@/content/faq.json'
import type { FaqItem } from '@/types/content'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CostSection />
      <ArchitectureSection />
      <ServicesSection />
      <BeforeAfterSection />
      <InteractiveTimeline />
      <LeadCalculatorSection />
      <TrustSection />
      <FoundersSection />
      <FaqSection items={faqData as FaqItem[]} />
      <PricingSection />
      <ContactSection />
    </>
  )
}
