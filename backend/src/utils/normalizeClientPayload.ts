import type { ClientLeadPayload } from '../types/client.js'

function normalizeString(value: unknown) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ')
}

function normalizeEmail(value: unknown) {
  return normalizeString(value).toLowerCase()
}

function normalizePhone(value: unknown) {
  const normalizedValue = normalizeString(value)

  return normalizedValue.replace(/[^\d+]/g, '')
}

export function normalizeClientPayload(payload: unknown): ClientLeadPayload {
  if (typeof payload !== 'object' || payload === null) {
    return {
      correo: '',
      nombre: '',
      numero: '',
    }
  }

  const data = payload as Record<string, unknown>

  return {
    correo: normalizeEmail(data.correo),
    nombre: normalizeString(data.nombre),
    numero: normalizePhone(data.numero),
  }
}
