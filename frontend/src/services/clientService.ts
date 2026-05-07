import type { ApiResponse } from '../types/api'
import type { ClientLead } from '../types/client'
import { httpClient } from './httpClient'

export async function createClientLead(payload: ClientLead) {
  return httpClient<ApiResponse<ClientLead>>('/api/clientes', {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
