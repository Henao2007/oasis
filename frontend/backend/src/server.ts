import { app } from './app.js'
import { env } from './config/env.js'

app.listen(env.server.port, () => {
  console.log(
    `Backend escuchando en http://localhost:${env.server.port} y conectado a la base ${env.db.database}`
  )
})
