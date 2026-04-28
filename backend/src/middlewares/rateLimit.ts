import type { NextFunction, Request, Response } from 'express'

type RateLimitOptions = {
  maxRequests: number
  windowMs: number
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const requestStore = new Map<string, RateLimitEntry>()

function getClientKey(request: Request) {
  const forwardedFor = request.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return `${request.path}:${forwardedFor.split(',')[0].trim()}`
  }

  return `${request.path}:${request.ip ?? 'unknown'}`
}

export function createRateLimitMiddleware(options: RateLimitOptions) {
  return (request: Request, response: Response, next: NextFunction) => {
    const now = Date.now()
    const key = getClientKey(request)
    const currentEntry = requestStore.get(key)

    if (!currentEntry || currentEntry.resetAt <= now) {
      requestStore.set(key, {
        count: 1,
        resetAt: now + options.windowMs,
      })

      return next()
    }

    if (currentEntry.count >= options.maxRequests) {
      const retryAfterSeconds = Math.ceil((currentEntry.resetAt - now) / 1000)

      response.setHeader('Retry-After', String(retryAfterSeconds))

      return response.status(429).json({
        data: null,
        message: 'Demasiadas solicitudes. Intenta de nuevo en un momento.',
        success: false,
      })
    }

    currentEntry.count += 1
    requestStore.set(key, currentEntry)

    return next()
  }
}
