import type { Request, Response } from 'express'
import { normalizeClientPayload } from '../utils/normalizeClientPayload.js'
import { validateClientPayload } from '../utils/validateClientPayload.js'
import {
  ClientConflictError,
  createClientLead,
} from '../services/clientes.service.js'

export async function createClienteController(request: Request, response: Response) {
  const payload = normalizeClientPayload(request.body)
  const validationError = validateClientPayload(payload)

  if (validationError) {
    return response.status(400).json({
      data: null,
      message: validationError,
      success: false,
    })
  }

  try {
    const createdClientLead = await createClientLead(payload)

    return response.status(201).json({
      data: createdClientLead,
      message: 'Datos guardados correctamente.',
      success: true,
    })
  } catch (error) {
    if (error instanceof ClientConflictError) {
      return response.status(409).json({
        data: null,
        message: error.message,
        success: false,
      })
    }

    return response.status(500).json({
      data: null,
      message: 'No se pudieron guardar los datos del cliente.',
      success: false,
    })
  }
}
