import { Router } from 'express'
import { createClienteController } from '../controllers/clientes.controller.js'

export const clientesRouter = Router()

clientesRouter.post('/clientes', createClienteController)
