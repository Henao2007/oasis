import type { ClientLeadPayload } from '../types/client.js'

export function validateClientPayload(payload: ClientLeadPayload) {
  if (!payload.nombre && !payload.correo && !payload.numero) {
    return 'Debes enviar al menos un dato del cliente.'
  }

  if (payload.nombre) {
    if (payload.nombre.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres.'
    }

    if (payload.nombre.length > 150) {
      return 'El nombre es demasiado largo.'
    }
  }

  if (payload.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.correo)) {
    return 'Ingresa un correo valido.'
  }

  if (payload.correo.length > 180) {
    return 'El correo es demasiado largo.'
  }

  if (payload.numero && !/^\+?[0-9]{7,15}$/.test(payload.numero)) {
    return 'Ingresa un numero valido.'
  }

  if (payload.numero.length > 30) {
    return 'El numero es demasiado largo.'
  }

  return null
}
