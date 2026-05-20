import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { WidgetDemoSection } from '@/components/sections/WidgetDemoSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { DashboardSection } from '@/components/sections/DashboardSection'
import { FoundersSection } from '@/components/sections/FoundersSection'
import { LeadCalculatorSection } from '@/components/sections/LeadCalculatorSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactSection } from '@/components/sections/ContactSection'

import faqData from '@/content/faq.json'
import type { FaqItem } from '@/types/content'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WidgetDemoSection />
      <ProcessSection />
      <DashboardSection />
      <FoundersSection />
      <LeadCalculatorSection />
      <PricingSection />
      <FaqSection items={faqData as FaqItem[]} />
      <ContactSection />
    </>
  )
}
