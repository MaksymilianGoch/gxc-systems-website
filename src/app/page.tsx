import { HeroSection } from '@/components/sections/HeroSection'
import { SystemFlowSection } from '@/components/sections/SystemFlowSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { WidgetDemoSection } from '@/components/sections/WidgetDemoSection'
import { WorkflowSection } from '@/components/sections/WorkflowSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { LeadCalculatorSection } from '@/components/sections/LeadCalculatorSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FoundersSection } from '@/components/sections/FoundersSection'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ContactSection } from '@/components/sections/ContactSection'

import faqData from '@/content/faq.json'
import type { FaqItem } from '@/types/content'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SystemFlowSection />
      <ProblemSection />
      <WidgetDemoSection />
      <WorkflowSection />
      <ServicesSection />
      <LeadCalculatorSection />
      <ProcessSection />
      <FoundersSection />
      <CaseStudySection />
      <FaqSection items={faqData as FaqItem[]} />
      <PricingSection />
      <ContactSection />
    </>
  )
}
