import type { ContactFormData } from './webhook'

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim().length === 0) {
    return `${fieldName} ist ein Pflichtfeld.`
  }
  return null
}

export function validateEmail(value: string): string | null {
  if (!value || value.trim().length === 0) {
    return 'E-Mail-Adresse ist ein Pflichtfeld.'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value.trim())) {
    return 'Bitte eine gültige E-Mail-Adresse eingeben.'
  }
  return null
}

// Accepts AT (+43), DE (+49), CH (+41), LI (+423) formats
export function validatePhone(value: string): string | null {
  if (!value || value.trim().length === 0) {
    return 'Telefonnummer ist ein Pflichtfeld.'
  }
  const cleaned = value.replace(/[\s\-().]/g, '')
  const phoneRegex =
    /^(\+43|0043|0)[\d]{7,14}$|^(\+49|0049)[\d]{7,14}$|^(\+41|0041)[\d]{7,12}$|^(\+423|00423)[\d]{5,10}$/
  if (!phoneRegex.test(cleaned)) {
    return 'Bitte eine gültige Telefonnummer eingeben (z. B. +43 664 1234567).'
  }
  return null
}

export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (value.trim().length < min) {
    return `${fieldName} muss mindestens ${min} Zeichen enthalten.`
  }
  return null
}

export function validateGdpr(accepted: boolean): string | null {
  if (!accepted) {
    return 'Bitte stimmen Sie der Datenschutzerklärung zu, um fortzufahren.'
  }
  return null
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  company?: string
  requestType?: string
  description?: string
  gdprAccepted?: string
}

export function validateContactForm(data: Partial<ContactFormData>): ContactFormErrors {
  const errors: ContactFormErrors = {}

  const nameError = validateRequired(data.name ?? '', 'Name')
  if (nameError) errors.name = nameError

  const emailError = validateEmail(data.email ?? '')
  if (emailError) errors.email = emailError

  const phoneError = validatePhone(data.phone ?? '')
  if (phoneError) errors.phone = phoneError

  const requestTypeError = validateRequired(data.requestType ?? '', 'Angefragtes Modul')
  if (requestTypeError) errors.requestType = requestTypeError

  const descriptionRequired = validateRequired(data.description ?? '', 'Nachricht')
  if (descriptionRequired) {
    errors.description = descriptionRequired
  } else {
    const descriptionLength = validateMinLength(data.description ?? '', 20, 'Nachricht')
    if (descriptionLength) errors.description = descriptionLength
  }

  const gdprError = validateGdpr(data.gdprAccepted ?? false)
  if (gdprError) errors.gdprAccepted = gdprError

  return errors
}

export function isFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0
}
