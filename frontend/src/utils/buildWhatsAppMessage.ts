import type { CartItem } from '../types/cart'
import type { ClientLead } from '../types/client'
import { formatCurrency } from './formatCurrency'

export function buildWhatsAppMessage(items: CartItem[], client?: ClientLead) {
  const lines = items.map(
    ({ product, quantity }) =>
      `- ${product.name} x${quantity} = ${formatCurrency(product.price * quantity)}`
  )

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return [
    'Hola, quiero realizar este pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatCurrency(total)}`,
    client?.nombre ? `Nombre: ${client.nombre}` : '',
    client?.numero ? `Numero: ${client.numero}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
