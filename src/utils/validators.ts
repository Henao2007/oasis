import type { ClientLead } from '../types/client'

export function validateLeadForm(values: ClientLead) {
  const errors: Partial<Record<keyof ClientLead, string>> = {}

  if (values.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
    errors.correo = 'Ingresa un correo valido.'
  }

  if (values.numero && !/^[0-9+\s-]{7,}$/.test(values.numero)) {
    errors.numero = 'Ingresa un numero valido.'
  }

  return errors
}
