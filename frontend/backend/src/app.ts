import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import { createRateLimitMiddleware } from './middlewares/rateLimit.js'
import { securityHeaders } from './middlewares/securityHeaders.js'
import { clientesRouter } from './routes/clientes.routes.js'

export const app = express()

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(securityHeaders)
app.use(
  cors({
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    origin(origin, callback) {
      if (!origin || env.app.allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Origen no permitido por CORS.'))
    },
  })
)
app.use(
  express.json({
    limit: env.app.bodyLimit,
  })
)
app.use(
  express.urlencoded({
    extended: false,
    limit: env.app.bodyLimit,
  })
)
app.use(
  '/api',
  createRateLimitMiddleware({
    maxRequests: env.app.rateLimitMaxRequests,
    windowMs: env.app.rateLimitWindowMs,
  })
)

app.get('/api/health', (_request, response) => {
  response.json({
    message: 'Backend de clientes activo.',
    success: true,
  })
})

app.use('/api', clientesRouter)
app.use(notFoundHandler)
app.use(errorHandler)
