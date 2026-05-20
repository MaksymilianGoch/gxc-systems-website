'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { FaqItem } from '@/types/content'

interface FaqSectionProps { items: FaqItem[] }

function FaqCard({ item, index, isOpen, onToggle }: {
  item: FaqItem; index: number; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        border: `1px solid ${isOpen ? 'rgba(0,32,69,0.2)' : 'rgba(196,198,207,0.4)'}`,
        boxShadow: isOpen
          ? '0 8px 32px -8px rgba(0,32,69,0.14)'
          : '0 2px 8px rgba(0,32,69,0.04)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.25rem',
          padding: '1.375rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, color: isOpen ? 'var(--color-green)' : 'var(--color-text-3)', marginTop: '0.15rem', flexShrink: 0, letterSpacing: '0.06em', transition: 'color 0.2s ease' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: isOpen ? 'var(--color-blue)' : 'var(--color-text)', lineHeight: 1.5, letterSpacing: '-0.01em', transition: 'color 0.2s ease', fontFamily: 'var(--font-display)' }}>
            {item.question}
          </span>
        </div>
        <div style={{
          width: 28, height: 28, flexShrink: 0, borderRadius: 'var(--radius-lg)',
          border: `1.5px solid ${isOpen ? 'var(--color-blue)' : 'var(--color-border-2)'}`,
          background: isOpen ? 'var(--color-blue)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: '0.05rem', transition: 'all 0.2s ease',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: isOpen ? 'white' : 'var(--color-text-3)', transition: 'transform 0.25s ease, color 0.2s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
            add
          </span>
        </div>
      </button>

      <div
        id={`faq-${item.id}`}
        role="region"
        style={{ maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div style={{ padding: '0 1.5rem 1.375rem 3.5rem' }}>
          <div style={{ width: '100%', height: 1, background: 'var(--color-border)', marginBottom: '1rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.75, borderLeft: '2px solid var(--color-green)', paddingLeft: '1rem' }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection({ items }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const visibleItems = items.slice(0, 5)

  return (
    <section className="section-y" style={{ background: 'var(--color-bg-2)' }} aria-labelledby="faq-heading">
      <Container>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <AnimateIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
              <p className="text-label mb-3">Häufige Fragen</p>
              <h2 id="faq-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em' }}>
                Was Betriebe wissen wollen.
              </h2>
            </div>
          </AnimateIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visibleItems.map((item, i) => (
              <AnimateIn key={item.id} delay={i * 55}>
                <FaqCard
                  item={item}
                  index={i}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={320}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-3)', marginBottom: '1rem' }}>
                Weitere Fragen? Unser KI-Assistent antwortet sofort — oder buche ein Gespräch.
              </p>
              <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.75rem 1.75rem' }}>
                Gespräch buchen
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>calendar_today</span>
              </a>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
