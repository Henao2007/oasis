import type { NextFunction, Request, Response } from 'express'

export function notFoundHandler(_request: Request, response: Response) {
  return response.status(404).json({
    data: null,
    message: 'Ruta no encontrada.',
    success: false,
  })
}

export function errorHandler(
  error: Error & { status?: number; type?: string },
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof SyntaxError && error.type === 'entity.parse.failed') {
    return response.status(400).json({
      data: null,
      message: 'El cuerpo de la solicitud no tiene un JSON valido.',
      success: false,
    })
  }

  return response.status(error.status ?? 500).json({
    data: null,
    message: 'Ocurrio un error inesperado en el servidor.',
    success: false,
  })
}
