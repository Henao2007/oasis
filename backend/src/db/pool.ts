import mysql from 'mysql2/promise'
import { env } from '../config/env.js'

export const dbPool = mysql.createPool({
  database: env.db.database,
  host: env.db.host,
  password: env.db.password,
  port: env.db.port,
  user: env.db.user,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})
