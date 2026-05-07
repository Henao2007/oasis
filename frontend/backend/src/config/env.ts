import dotenv from 'dotenv'

dotenv.config()

function readNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback
  }

  const parsedValue = Number(value)

  return Number.isNaN(parsedValue) ? fallback : parsedValue
}

function readList(value: string | undefined, fallback: string[]) {
  if (!value) {
    return fallback
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const env = {
  app: {
    allowedOrigins: readList(process.env.ALLOWED_ORIGINS, [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ]),
    bodyLimit: process.env.BODY_LIMIT ?? '32kb',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    rateLimitMaxRequests: readNumber(process.env.RATE_LIMIT_MAX_REQUESTS, 15),
    rateLimitWindowMs: readNumber(process.env.RATE_LIMIT_WINDOW_MS, 60000),
  },
  db: {
    database: process.env.DB_NAME ?? 'oasis',
    host: process.env.DB_HOST ?? 'localhost',
    password: process.env.DB_PASSWORD ?? '',
    port: readNumber(process.env.DB_PORT, 3306),
    user: process.env.DB_USER ?? 'root',
  },
  server: {
    port: readNumber(process.env.SERVER_PORT, 3001),
  },
}
