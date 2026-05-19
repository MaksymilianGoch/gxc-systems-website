'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { FaqItem } from '@/types/content'

interface FaqSectionProps { items: FaqItem[] }

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="transition-all duration-200"
      style={{
        borderBottom: '1px solid var(--color-line)',
        background: isOpen ? 'var(--color-surface)' : 'transparent',
      }}
    >
      <button
        type="button"
        className="w-full flex items-start justify-between gap-6 py-6 px-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
      >
        <div className="flex items-start gap-5 flex-1">
          <span
            className="shrink-0 text-xs mt-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              color: isOpen ? 'var(--color-teal)' : 'var(--color-text-soft)',
              transition: 'color 0.2s',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-medium"
            style={{
              color: isOpen ? 'var(--color-text)' : 'var(--color-text-mid)',
              fontSize: '0.975rem',
              lineHeight: 1.5,
              transition: 'color 0.2s',
            }}
          >
            {item.question}
          </span>
        </div>

        <div
          className="shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-200"
          style={{
            border: `1px solid ${isOpen ? 'var(--color-teal)' : 'var(--color-line)'}`,
            background: isOpen ? 'var(--color-teal)' : 'transparent',
            borderRadius: '2px',
            marginTop: '2px',
          }}
        >
          {isOpen
            ? <Minus size={13} color="white" />
            : <Plus size={13} color="var(--color-text-soft)" />
          }
        </div>
      </button>

      <div
        id={`faq-${item.id}`}
        role="region"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="px-6 pb-6 pl-[4.5rem]">
          <p
            style={{
              color: 'var(--color-text-mid)',
              fontSize: '0.9rem',
              lineHeight: 1.75,
              borderLeft: '2px solid var(--color-teal)',
              paddingLeft: '1.25rem',
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection({ items }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section
      className="section-y"
      style={{ background: 'var(--color-surface)' }}
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="max-w-3xl mx-auto">

          <AnimateIn>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10" style={{ background: 'var(--color-gold)' }} />
                <span className="text-label">Häufige Fragen</span>
              </div>
              <h2
                id="faq-heading"
                className="text-display-sm"
                style={{ color: 'var(--color-text)' }}
              >
                Was Betriebe wissen wollen.
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <div
              style={{
                border: '1px solid var(--color-line)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {items.map((item, i) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </AnimateIn>

        </div>
      </Container>
    </section>
  )
}
