'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { validateContactForm, isFormValid } from '@/lib/validation'
import type { ContactFormErrors } from '@/lib/validation'
import type { ContactFormData } from '@/lib/webhook'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormProps { dark?: boolean }

const requestTypeOptions: { value: ContactFormData['requestType']; label: string }[] = [
  { value: 'lead-engine', label: 'Verpasste Anfragen — ich verliere Aufträge' },
  { value: 'terminbuchung', label: 'Terminchaos — Koordination kostet zu viel Zeit' },
  { value: 'kommunikations-hub', label: 'Langsame Reaktion — ich antworte zu spät' },
  { value: 'online-praesenz', label: 'Zu viel Admin-Arbeit — ich brauche Struktur' },
  { value: 'vollpaket', label: 'Fehlende Übersicht — ich weiß nicht wo was steht' },
  { value: 'sonstiges', label: 'Weiß nicht genau — sagt mir, wo mein Leck ist' },
]

const inputBase =
  'border border-border rounded-sm px-4 py-3 w-full text-sm text-navy bg-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent placeholder:text-text-muted'
const inputError = 'border-red-400 focus:ring-red-400'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-red-600 mt-1">{message}</p>
}

export function ContactForm({ dark = false }: ContactFormProps) {
  void dark
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    gdprAccepted: false,
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState<string>('')

  const update = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateContactForm(formData)
    if (!isFormValid(validation)) {
      setErrors(validation)
      return
    }

    setStatus('submitting')
    setServerError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        const data = (await response.json()) as { error?: string }
        setServerError(data.error ?? 'Unbekannter Fehler.')
        setStatus('error')
      }
    } catch {
      setServerError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle size={48} className="text-teal" aria-hidden="true" />
        <h3 className="text-xl font-heading font-medium text-navy">
          Ihre Nachricht ist angekommen.
        </h3>
        <p className="text-text-secondary text-sm max-w-sm">
          Wir melden uns innerhalb von 4 Stunden an Werktagen. Bitte prüfen Sie auch Ihren
          Spam-Ordner.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
      {/* Server error */}
      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-amber/10 border border-amber/30 rounded-sm px-4 py-3 mb-6"
        >
          <AlertCircle size={16} className="text-amber shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-navy">
            {serverError} Oder schreiben Sie uns direkt an{' '}
            <a
              href="mailto:office@gxc-systems.com"
              className="underline underline-offset-2 hover:text-teal"
            >
              office@gxc-systems.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
            Ihr Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name ?? ''}
            onChange={(e) => update('name', e.target.value)}
            className={`${inputBase} ${errors.name ? inputError : ''}`}
            placeholder="Max Mustermann"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          <FieldError message={errors.name} />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
            E-Mail-Adresse <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email ?? ''}
            onChange={(e) => update('email', e.target.value)}
            className={`${inputBase} ${errors.email ? inputError : ''}`}
            placeholder="max@mustermann.at"
            aria-invalid={!!errors.email}
          />
          <FieldError message={errors.email} />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
            Telefon <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phone ?? ''}
            onChange={(e) => update('phone', e.target.value)}
            className={`${inputBase} ${errors.phone ? inputError : ''}`}
            placeholder="+43 664 123 456 7"
            aria-invalid={!!errors.phone}
          />
          <FieldError message={errors.phone} />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-navy mb-1.5">
            Firma{' '}
            <span className="text-text-muted font-normal text-xs">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={formData.company ?? ''}
            onChange={(e) => update('company', e.target.value)}
            className={inputBase}
            placeholder="Muster GmbH"
          />
        </div>

        {/* Request Type */}
        <div className="md:col-span-2">
          <label htmlFor="requestType" className="block text-sm font-medium text-navy mb-1.5">
            Was beschäftigt dich gerade am meisten?{' '}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="requestType"
            required
            value={formData.requestType ?? ''}
            onChange={(e) =>
              update('requestType', e.target.value as ContactFormData['requestType'])
            }
            className={`${inputBase} ${errors.requestType ? inputError : ''} cursor-pointer`}
            aria-invalid={!!errors.requestType}
          >
            <option value="" disabled>
              Größtes Problem wählen
            </option>
            {requestTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.requestType} />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-navy mb-1.5">
            Kurz beschreiben — wo siehst du den größten Schmerz?{' '}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={formData.description ?? ''}
            onChange={(e) => update('description', e.target.value)}
            className={`${inputBase} resize-none ${errors.description ? inputError : ''}`}
            placeholder="z.B.: Ich bekomme täglich 5 Anfragen, verliere davon 2–3, und bin ständig am Koordinieren..."
            aria-invalid={!!errors.description}
          />
          <FieldError message={errors.description} />
        </div>

        {/* GDPR */}
        <div className="md:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.gdprAccepted ?? false}
              onChange={(e) => update('gdprAccepted', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded-sm border-border accent-teal cursor-pointer"
              aria-describedby={errors.gdprAccepted ? 'gdpr-error' : undefined}
              aria-invalid={!!errors.gdprAccepted}
            />
            <span className="text-sm text-text-secondary">
              Ich habe die{' '}
              <a
                href="/datenschutz"
                className="text-teal underline underline-offset-2 hover:text-teal/80"
                target="_blank"
                rel="noopener"
              >
                Datenschutzerklärung
              </a>{' '}
              gelesen und stimme der Verarbeitung meiner Daten für die Bearbeitung meiner Anfrage
              zu. <span className="text-red-500" aria-hidden="true">*</span>
            </span>
          </label>
          {errors.gdprAccepted && (
            <p id="gdpr-error" className="text-xs text-red-600 mt-1 ml-7">
              {errors.gdprAccepted}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto"
          >
            {status === 'submitting' ? 'Wird gesendet…' : 'Erstgespräch anfragen'}
          </Button>
          <p className="mt-3 text-xs text-text-muted">
            * Pflichtfelder. Ihre Daten werden nur für die Bearbeitung Ihrer Anfrage verwendet.
          </p>
        </div>
      </div>
    </form>
  )
}
