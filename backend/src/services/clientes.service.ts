import { dbPool } from '../db/pool.js'
import type { ClientLeadPayload } from '../types/client.js'

type DuplicateField = 'correo' | 'numero'

export class ClientConflictError extends Error {
  field: DuplicateField

  constructor(field: DuplicateField, message: string) {
    super(message)
    this.name = 'ClientConflictError'
    this.field = field
  }
}

export async function createClientLead(payload: ClientLeadPayload) {
  try {
    if (payload.correo) {
      const [correoRows] = await dbPool.query(
        'SELECT id FROM clientes WHERE correo = ? LIMIT 1',
        [payload.correo]
      )

      if (Array.isArray(correoRows) && correoRows.length > 0) {
        throw new ClientConflictError('correo', 'Este correo ya existe.')
      }
    }

    if (payload.numero) {
      const [numeroRows] = await dbPool.query(
        'SELECT id FROM clientes WHERE numero = ? LIMIT 1',
        [payload.numero]
      )

      if (Array.isArray(numeroRows) && numeroRows.length > 0) {
        throw new ClientConflictError('numero', 'Este numero ya existe.')
      }
    }

    await dbPool.query(
      `
        INSERT INTO clientes (nombre, correo, numero)
        VALUES (?, ?, ?)
      `,
      [
        payload.nombre || null,
        payload.correo || null,
        payload.numero || null,
      ]
    )
  } catch (error) {
    if (error instanceof ClientConflictError) {
      throw error
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ER_DUP_ENTRY'
    ) {
      const mysqlErrorMessage =
        'sqlMessage' in error && typeof error.sqlMessage === 'string'
          ? error.sqlMessage
          : ''

      if (mysqlErrorMessage.includes('correo')) {
        throw new ClientConflictError('correo', 'Este correo ya existe.')
      }

      if (mysqlErrorMessage.includes('numero')) {
        throw new ClientConflictError('numero', 'Este numero ya existe.')
      }
    }

    throw error
  }

  return payload
}
